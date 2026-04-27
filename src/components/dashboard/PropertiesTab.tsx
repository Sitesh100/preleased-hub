'use client';

import { useMemo, useState } from 'react';
import StatCard from './StatCard';
import Badge from './Badge';
import PropertyListingForm, {
  type PropertyFormInitialValues,
} from '@/src/components/post-property/PropertyListingForm';
import {
  useDeletePropertyMutation,
  useViewPropertyQuery,
} from '@/src/redux/features/property/propertyApi';

interface ApiPropertyItem {
  id: string;
  owner_company_name?: string;
  phone_number?: string;
  email_address?: string;
  property_name?: string;
  city?: string;
  full_address?: string;
  expected_price_rent?: string | number;
  rooms_keys?: string | number;
  current_occupancy_percent?: string | number;
  current_monthly_income?: string | number;
  intent?: string | number;
  property_type?: string | number;
  status?: string;
  approval_status?: string;
}

interface DashboardPropertyRow {
  id: string;
  name: string;
  location: string;
  price: string;
  status: string;
  type: string;
  area: string;
  interested: number;
  raw: ApiPropertyItem;
}

function extractApiPropertyList(payload: unknown): ApiPropertyItem[] {
  const root = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : null;
  const data = root && 'data' in root ? root.data : payload;

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((record) => {
    return {
      id: String(record.id ?? ''),
      owner_company_name: typeof record.owner_company_name === 'string' ? record.owner_company_name : '',
      phone_number: typeof record.phone_number === 'string' ? record.phone_number : '',
      email_address: typeof record.email_address === 'string' ? record.email_address : '',
      property_name: typeof record.property_name === 'string' ? record.property_name : '',
      city: typeof record.city === 'string' ? record.city : '',
      full_address: typeof record.full_address === 'string' ? record.full_address : '',
      expected_price_rent:
        typeof record.expected_price_rent === 'number' || typeof record.expected_price_rent === 'string'
          ? record.expected_price_rent
          : '',
      rooms_keys: typeof record.rooms_keys === 'number' || typeof record.rooms_keys === 'string' ? record.rooms_keys : '',
      current_occupancy_percent:
        typeof record.current_occupancy_percent === 'number' ||
        typeof record.current_occupancy_percent === 'string'
          ? record.current_occupancy_percent
          : '',
      current_monthly_income:
        typeof record.current_monthly_income === 'number' ||
        typeof record.current_monthly_income === 'string'
          ? record.current_monthly_income
          : '',
      intent: typeof record.intent === 'number' || typeof record.intent === 'string' ? record.intent : '',
      property_type:
        typeof record.property_type === 'number' || typeof record.property_type === 'string'
          ? record.property_type
          : '',
      status: typeof record.status === 'string' ? record.status : '',
      approval_status: typeof record.approval_status === 'string' ? record.approval_status : '',
    };
  });
}

function formatPrice(value: string | number | undefined) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0) return 'N/A';
  return `₹${numericValue.toLocaleString('en-IN')}`;
}

function mapPropertyType(value: string | number | undefined) {
  const normalized = String(value ?? '').toLowerCase();
  if (normalized === '1' || normalized === 'hotel') return 'Hotel';
  if (normalized === '2' || normalized === 'resort') return 'Resort';
  if (normalized === '3' || normalized === 'villa') return 'Villa';
  if (normalized === '4' || normalized === 'service apartment') return 'Service Apartment';
  if (normalized === '5' || normalized === 'holiday home') return 'Holiday Home';
  return 'Property';
}

function mapStatus(property: ApiPropertyItem) {
  const rawStatus = (property.approval_status || property.status || '').toLowerCase().trim();
  if (rawStatus.includes('active') || rawStatus.includes('approved')) return 'Active';
  if (rawStatus.includes('reject')) return 'Rejected';
  if (rawStatus.includes('sold')) return 'Sold';
  if (rawStatus.includes('pending') || rawStatus.includes('review')) return 'Pending';
  return 'Pending';
}

function toFormInitialValues(property: ApiPropertyItem): PropertyFormInitialValues {
  return {
    id: property.id,
    owner_company_name: property.owner_company_name ?? '',
    phone_number: property.phone_number ?? '',
    email_address: property.email_address ?? '',
    property_name: property.property_name ?? '',
    city: property.city ?? '',
    full_address: property.full_address ?? '',
    expected_price_rent: property.expected_price_rent ?? '',
    rooms_keys: property.rooms_keys ?? '',
    current_occupancy_percent: property.current_occupancy_percent ?? '',
    current_monthly_income: property.current_monthly_income ?? '',
    intent: property.intent ?? '',
    property_type: property.property_type ?? '',
  };
}

export default function PropertiesTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyFormInitialValues | null>(null);
  const [rowError, setRowError] = useState<string | null>(null);
  const { data, isLoading, refetch } = useViewPropertyQuery();
  const [deleteProperty, { isLoading: isDeleting }] = useDeletePropertyMutation();

  const properties = useMemo(() => extractApiPropertyList(data), [data]);

  const rows = useMemo<DashboardPropertyRow[]>(
    () =>
      properties.map((property) => ({
        id: property.id,
        name: property.property_name?.trim() || 'Untitled Property',
        location: `${property.city || 'Unknown City'}${property.full_address ? `, ${property.full_address}` : ''}`,
        price: formatPrice(property.expected_price_rent),
        status: mapStatus(property),
        type: mapPropertyType(property.property_type),
        area: property.rooms_keys ? `${property.rooms_keys} Keys` : 'N/A',
        interested: 0,
        raw: property,
      })),
    [properties]
  );

  const activeCount = rows.filter((row) => row.status === 'Active').length;
  const pendingCount = rows.filter((row) => row.status === 'Pending').length;
  const rejectedCount = rows.filter((row) => row.status === 'Rejected').length;

  async function handleDelete(propertyId: string) {
    setRowError(null);
    try {
      await deleteProperty(propertyId).unwrap();
      await refetch();
    } catch (error) {
      const apiError = error as { data?: { message?: string }; error?: string };
      setRowError(apiError?.data?.message ?? apiError?.error ?? 'Unable to delete property. Please try again.');
    }
  }

  function handleEdit(property: DashboardPropertyRow) {
    setEditingProperty(toFormInitialValues(property.raw));
    setShowForm(true);
    setRowError(null);
  }

  function handleAddListing() {
    setEditingProperty(null);
    setShowForm((prev) => !prev);
    setRowError(null);
  }

  async function handleFormSuccess() {
    setShowForm(false);
    setEditingProperty(null);
    await refetch();
  }

  function handleCancelEdit() {
    setEditingProperty(null);
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Listings" value={String(rows.length)} sub={`${activeCount} active`} />
        <StatCard label="Active" value={String(activeCount)} sub="approved and live" />
        <StatCard label="Pending" value={String(pendingCount)} sub="awaiting admin review" />
        <StatCard label="Rejected" value={String(rejectedCount)} sub="needs correction and resubmit" />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-black">My Listings</h2>
          <button
            onClick={handleAddListing}
            className="h-9 rounded-xl bg-black px-4 text-xs font-bold text-white transition hover:bg-gray-800"
          >
            {showForm ? 'Close Form' : '+ Add Listing'}
          </button>
        </div>

        {showForm && (
          <div className="mb-5 rounded-2xl border border-black/10 bg-white p-3 sm:p-5">
            <p className="mb-3 text-sm text-gray-500">
              {editingProperty
                ? 'Update your listing details and save to send changes for review.'
                : 'Post a new property directly from dashboard using the same listing form used on website.'}
            </p>
            <PropertyListingForm
              submitLabel={editingProperty ? 'Update Property' : 'Submit Listing For Review'}
              className="rounded-2xl border border-[#d5dee9] bg-[#f5f6f8] p-4 shadow-none sm:p-5"
              initialValues={editingProperty}
              onSuccess={handleFormSuccess}
              onCancel={editingProperty ? handleCancelEdit : undefined}
            />
          </div>
        )}

        {rowError && <p className="mb-3 text-sm text-red-600">{rowError}</p>}

        <div className="overflow-hidden rounded-2xl border border-black/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-[#fafafa]">
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Property</th>
                <th className="hidden px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">Type</th>
                <th className="hidden px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">Area</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="hidden px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">Interested</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="px-5 py-8 text-sm text-gray-500" colSpan={7}>
                    Loading properties...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-sm text-gray-500" colSpan={7}>
                    No properties found.
                  </td>
                </tr>
              ) : (
                rows.map((property) => (
                  <tr
                    key={property.id}
                    className="border-b border-black/5 transition-colors last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-black">{property.name}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{property.location}</p>
                    </td>
                    <td className="hidden px-5 py-4 text-xs text-gray-600 md:table-cell">{property.type}</td>
                    <td className="hidden px-5 py-4 text-xs text-gray-600 lg:table-cell">{property.area}</td>
                    <td className="px-5 py-4 text-sm font-bold text-black">{property.price}</td>
                    <td className="px-5 py-4">
                      <Badge status={property.status} />
                    </td>
                    <td className="hidden px-5 py-4 text-xs text-gray-500 lg:table-cell">
                      {property.interested > 0 ? `${property.interested} lead visible` : 'No interested lead yet'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          className="text-xs font-medium text-gray-500 transition hover:text-black"
                          onClick={() => handleEdit(property)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-xs font-medium text-red-500 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                          onClick={() => handleDelete(property.id)}
                          disabled={isDeleting}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
