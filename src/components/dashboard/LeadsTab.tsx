// src/components/dashboard/LeadsTab.tsx
'use client';

import { useMemo } from 'react';
import { CalendarCheck2, RefreshCw, Users } from 'lucide-react';
import StatCard from './StatCard';
import Badge from './Badge';
import {
  IGetMyInquiriesQueryResponse,
  IMyInquiryItem,
  useGetMyInquiriesQuery,
} from '@/src/redux/features/property/propertyApi';

type InquiryCard = {
  id: string;
  property: string;
  leadType: string;
  budget: string;
  purpose: string;
  timeline: string;
  hasMeetingRequest: boolean;
  connectRequested: boolean;
  summary: string;
  status: string;
  contactState: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as Record<string, unknown>;
}

function firstText(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }

    if (typeof value === 'number') {
      return String(value);
    }
  }

  return null;
}

function extractInquiries(response: IGetMyInquiriesQueryResponse | undefined): IMyInquiryItem[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (!response || typeof response !== 'object') {
    return [];
  }

  const data = (response as { data?: unknown }).data;
  if (Array.isArray(data)) {
    return data as IMyInquiryItem[];
  }

  const results = (response as { results?: unknown }).results;
  if (Array.isArray(results)) {
    return results as IMyInquiryItem[];
  }

  return [];
}

function parseBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    return ['true', '1', 'yes'].includes(value.toLowerCase());
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  return false;
}

function normalizeInquiries(items: IMyInquiryItem[]): InquiryCard[] {
  return items.map((item, index) => {
    const record = asRecord(item) ?? {};
    const propertyRecord = asRecord(record.property);
    const status = firstText(record.status, record.inquiry_status, record.state) ?? 'Submitted';
    const contactState =
      firstText(record.contact_state, record.contact_visibility, record.contactStatus) ??
      'Contact hidden';

    return {
      id:
        firstText(record.id, record.inquiry_id, record.uuid, record.slug) ??
        `${index + 1}`,
      property:
        firstText(
          record.property_title,
          record.property_name,
          record.title,
          propertyRecord?.title,
          propertyRecord?.property_name,
          propertyRecord?.name
        ) ?? `Inquiry #${index + 1}`,
      leadType: firstText(record.lead_type, record.role, record.inquiry_type, record.user_role) ?? 'N/A',
      budget: firstText(record.budget, record.offer_amount, record.expected_price_rent) ?? 'Not specified',
      purpose: firstText(record.purpose, record.intent, record.category) ?? 'Not specified',
      timeline:
        firstText(
          record.timeline,
          record.expected_timeline,
          record.expected_closure_timeline,
          record.created_at,
          record.createdAt
        ) ?? 'Not specified',
      hasMeetingRequest: parseBoolean(
        record.has_meeting_request ?? record.meeting_requested ?? record.is_meeting_requested
      ),
      connectRequested: parseBoolean(record.connect_requested ?? record.is_connect_requested),
      summary: firstText(record.summary, record.message, record.note, record.description) ?? 'No summary available.',
      status,
      contactState,
    };
  });
}

function getErrorMessage(error: unknown): string {
  const errorRecord = asRecord(error);
  const data = asRecord(errorRecord?.data);
  return (
    firstText(data?.message, errorRecord?.error, errorRecord?.status) ??
    'Unable to load lead inquiries right now.'
  );
}

export default function LeadsTab() {
  const { data, isLoading, isError, error } = useGetMyInquiriesQuery();

  const inquiries = useMemo(() => normalizeInquiries(extractInquiries(data)), [data]);
  const requestCenterItems = useMemo(
    () => inquiries.filter((item) => item.connectRequested || item.hasMeetingRequest),
    [inquiries]
  );
  const sharedContactsCount = useMemo(
    () => inquiries.filter((item) => item.contactState.toLowerCase() !== 'contact hidden').length,
    [inquiries]
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Qualified Leads" value={String(inquiries.length)} sub="visible to seller" />
        <StatCard
          label="Meeting Requests"
          value={String(inquiries.filter((item) => item.hasMeetingRequest).length)}
          sub="from your inquiries"
        />
        <StatCard
          label="Connect Requests"
          value={String(inquiries.filter((item) => item.connectRequested).length)}
          sub="from your inquiries"
        />
        <StatCard label="Shared Contacts" value={String(sharedContactsCount)} sub="admin approval required" />
      </div>

      <section className="rounded-3xl border border-black/10 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f8] text-[#111827]">
            <RefreshCw className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-black leading-tight">Connection &amp; Meeting Request Center</h2>
            <p className="text-sm text-gray-500 mt-1">
              Track seller-raised connect requests after admin shares a lead summary.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-5 rounded-2xl border border-dashed border-black/10 bg-[#fafafa] p-6 text-center text-sm text-gray-400">
            Loading inquiry requests...
          </div>
        ) : isError ? (
          <div className="mt-5 rounded-2xl border border-dashed border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
            {getErrorMessage(error)}
          </div>
        ) : requestCenterItems.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-black/10 bg-[#fafafa] p-6 text-center text-sm text-gray-400">
            No connect or meeting requests yet.
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {requestCenterItems.map((request) => (
              <div key={request.id} className="rounded-2xl border border-black/10 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-black leading-tight text-black">{request.property}</p>
                    <p className="mt-1 text-sm text-[#5b6b84]">
                      Type: {request.leadType} • Purpose: {request.purpose}
                    </p>
                  </div>
                  <Badge status={request.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f8] text-[#111827]">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-black leading-tight">Interested Leads Visible to Seller</h2>
            <p className="text-sm text-gray-500 mt-1">
              Seller sees qualified lead summary. Contact details remain hidden until admin approves connect.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {isLoading ? (
            <div className="rounded-2xl border border-dashed border-black/10 bg-[#fafafa] p-6 text-center text-sm text-gray-400">
              Loading lead inquiries...
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-dashed border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
              {getErrorMessage(error)}
            </div>
          ) : inquiries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/10 bg-[#fafafa] p-6 text-center text-sm text-gray-400">
              No inquiries found.
            </div>
          ) : (
            inquiries.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-black/10 p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-2xl font-black leading-tight text-black">{lead.property}</p>
                  <p className="mt-2 text-sm text-[#5b6b84]">
                    Lead type: {lead.leadType} • Budget: {lead.budget} • Purpose: {lead.purpose}
                  </p>
                  <p className="text-sm text-[#5b6b84] mt-1">
                    Timeline: {lead.timeline} • Meeting request: {lead.hasMeetingRequest ? 'Yes' : 'No'}
                  </p>
                  <p className="mt-2 text-sm text-[#5b6b84]">Summary: {lead.summary}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge status={lead.status} />
                    <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-[#f7f8fa] px-3 py-1 text-xs text-gray-500">
                      <CalendarCheck2 className="h-3.5 w-3.5" />
                      {lead.contactState}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:pt-1">
                  <button className="h-10 rounded-xl bg-black px-4 text-xs font-bold text-white transition hover:bg-gray-800">
                    Request Connect
                  </button>
                  <button className="h-10 rounded-xl border border-black/10 px-4 text-xs font-bold text-gray-700 transition hover:bg-gray-50">
                    Request Meeting
                  </button>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
