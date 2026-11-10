// In-memory stand-in for the old backend. Every RTK Query endpoint resolves here,
// so components keep using the same hooks with no network calls.
// ponytail: state lives in memory and resets on page reload; persist to localStorage if testers need it to stick.
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Row = Record<string, unknown>;

const img = (id: string) => [{ id: `doc-${id}`, document_file: `https://images.unsplash.com/${id}?w=1400&q=80` }];

// listing_type: 1 = Sale, 2 = Lease, 3 = Pre-Leased. property_type: 1 Hotel, 2 Resort, 3 Villa, 4 Service Apt, 5 Holiday Home
let properties: Row[] = [
  {
    id: "1", slug: "31-key-running-hotel-indore", property_name: "31-Key Running Hotel", city: "Indore",
    location: "Vijay Nagar", full_address: "Vijay Nagar", property_type: 1, rooms: 31, built_up_area: 18500,
    listing_type: 3, selling_price: 51000000, annual_rental_income: 3978000, expected_monthly_rent: 331500,
    security_deposit: 1000000, lock_in_period: "9 years", owner_company_name: "Malwa Hospitality LLP",
    phone_number: "9876500001", email_address: "owner1@example.com", status: "approved",
    property_description: "A stabilized hospitality asset in a growing commercial corridor with immediate revenue visibility.",
    documents: img("photo-1564501049412-61c2a3083791"), created_at: "12 Jan 2026",
  },
  {
    id: "2", slug: "service-apartment-block-gurugram", property_name: "Service Apartment Block", city: "Gurugram",
    location: "Sector 44", full_address: "Sector 44", property_type: 4, rooms: 40, built_up_area: 14200,
    listing_type: 2, selling_price: 0, annual_rental_income: 0, expected_monthly_rent: 435500,
    security_deposit: 1300000, lock_in_period: "6 years", owner_company_name: "UrbanStay Pvt Ltd",
    phone_number: "9876500002", email_address: "owner2@example.com", status: "approved",
    property_description: "A professionally managed service apartment block designed for urban long-stay demand.",
    documents: img("photo-1486325212027-8081e485255e"), created_at: "08 Feb 2026",
  },
  {
    id: "3", slug: "city-center-business-hotel-pune", property_name: "City Center Business Hotel", city: "Pune",
    location: "Shivaji Nagar", full_address: "Shivaji Nagar", property_type: 1, rooms: 28, built_up_area: 16500,
    listing_type: 1, selling_price: 42000000, annual_rental_income: 0, expected_monthly_rent: 0,
    security_deposit: 0, lock_in_period: "N/A", owner_company_name: "Deccan Stays",
    phone_number: "9876500003", email_address: "owner3@example.com", status: "approved",
    property_description: "A centrally located hotel asset in a core-city business catchment with repeat demand.",
    documents: img("photo-1582719508461-905c673771fd"), created_at: "19 Mar 2026",
  },
  {
    id: "4", slug: "pre-leased-boutique-resort-north-goa", property_name: "Pre-leased Boutique Resort", city: "Goa",
    location: "Anjuna, North Goa", full_address: "Anjuna, North Goa", property_type: 2, rooms: 22, built_up_area: 21000,
    listing_type: 3, selling_price: 85000000, annual_rental_income: 7650000, expected_monthly_rent: 637500,
    security_deposit: 2000000, lock_in_period: "10 years", owner_company_name: "Coastal Retreats",
    phone_number: "9876500004", email_address: "owner4@example.com", status: "approved",
    property_description: "Beach-adjacent boutique resort leased to a branded operator on a long lock-in.",
    documents: img("photo-1571896349842-33c89424de2d"), created_at: "02 Apr 2026",
  },
  {
    id: "5", slug: "heritage-villa-jaipur", property_name: "Heritage Haveli Villa", city: "Jaipur",
    location: "Civil Lines", full_address: "Civil Lines", property_type: 3, rooms: 9, built_up_area: 9800,
    listing_type: 1, selling_price: 32000000, annual_rental_income: 0, expected_monthly_rent: 0,
    security_deposit: 0, lock_in_period: "N/A", owner_company_name: "Rajputana Estates",
    phone_number: "9876500005", email_address: "owner5@example.com", status: "approved",
    property_description: "Restored heritage villa suited for boutique stay conversion.",
    documents: img("photo-1613490493576-7fde63acd811"), created_at: "21 Apr 2026",
  },
  {
    id: "6", slug: "holiday-home-manali", property_name: "Mountain Holiday Home", city: "Manali",
    location: "Old Manali", full_address: "Old Manali", property_type: 5, rooms: 6, built_up_area: 5200,
    listing_type: 2, selling_price: 0, annual_rental_income: 0, expected_monthly_rent: 180000,
    security_deposit: 500000, lock_in_period: "3 years", owner_company_name: "Himalayan Homes",
    phone_number: "9876500006", email_address: "owner6@example.com", status: "pending",
    property_description: "Furnished holiday home with valley views, ready for an operator lease.",
    documents: img("photo-1449844908441-8829872d2607"), created_at: "05 May 2026",
  },
  {
    id: "7", slug: "seafront-hotel-mumbai", property_name: "Seafront Business Hotel", city: "Mumbai",
    location: "Juhu", full_address: "Juhu", property_type: 1, rooms: 54, built_up_area: 32000,
    listing_type: 3, selling_price: 180000000, annual_rental_income: 14400000, expected_monthly_rent: 1200000,
    security_deposit: 5000000, lock_in_period: "12 years", owner_company_name: "Juhu Hotels Ltd",
    phone_number: "9876500007", email_address: "owner7@example.com", status: "rejected",
    property_description: "Seafront business hotel with a long-term lease to a national chain.",
    documents: img("photo-1566073771259-6a8506099945"), created_at: "14 May 2026",
  },
];

const featuredIds = ["1", "4", "2", "5"];

let inquiries: Row[] = [
  {
    id: "101", property: "4", property_name: "Pre-leased Boutique Resort", lead_type: "Buyer", buyer_name: "Rohan Mehta",
    budget: "₹8.5 Cr", purpose: "Investment", status: "Submitted", contact_state: "Contact hidden",
    summary: "Looking for a yield-led resort asset in Goa.", created_at: "10 Oct 2026",
    has_meeting_request: false, connect_requested: true,
  },
  {
    id: "102", property: "2", property_name: "Service Apartment Block", lead_type: "Lessee", buyer_name: "StayWell Operators",
    budget: "₹4.3 L / month", purpose: "Operate", status: "Meeting Requested", contact_state: "Contact hidden",
    summary: "Operator interested in a 6-year lease.", created_at: "18 Oct 2026",
    has_meeting_request: true, connect_requested: true,
  },
  {
    id: "103", property: "1", property_name: "31-Key Running Hotel", lead_type: "Buyer", buyer_name: "Ananya Shah",
    budget: "₹5.1 Cr", purpose: "Investment", status: "Meeting Scheduled", contact_state: "Contact shared",
    meet_link: "https://meet.google.com/abc-defg-hij", summary: "Wants to review occupancy reports.",
    created_at: "25 Oct 2026", has_meeting_request: true, connect_requested: true,
  },
];

let nextId = 1000;
const delay = () => new Promise((r) => setTimeout(r, 250)); // keep loading states visible

function toObject(body: unknown): Row {
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    const out: Row = {};
    body.forEach((value, key) => {
      out[key] = value instanceof File ? URL.createObjectURL(value) : value;
    });
    return out;
  }
  return (body as Row) ?? {};
}

function withDocs(row: Row): Row {
  const file = row.uploaded_documents;
  if (typeof file === "string" && file) {
    const rest = { ...row };
    delete rest.uploaded_documents;
    return { ...rest, documents: [{ id: `doc-${nextId}`, document_file: file }] };
  }
  return row;
}

const ok = (data: unknown, message = "Success") => ({ data: { status: true, message, data } });
const fail = (status: number, message: string) => ({ error: { status, data: { message } } as FetchBaseQueryError });

const approved = () => properties.filter((p) => p.status === "approved");

function handle(url: string, method: string, body: Row, params: Row) {
  const path = url.replace(/^\/+/, "");

  // ── Auth ──
  if (path.endsWith("user/register/")) return ok(null, "Account created successfully.");
  if (path.endsWith("user/login/")) {
    if (!body.phone_no || !body.password) return fail(400, "Phone number and password are required.");
    return { data: { status: true, message: "Logged in", access_token: "mock-access", refresh_token: "mock-refresh" } };
  }

  // ── Properties ──
  if (path.endsWith("approve_property_view/")) return ok(approved());
  if (path.endsWith("featured_property_view/")) return ok(featuredIds.map((id) => properties.find((p) => p.id === id)).filter(Boolean));
  if (path.endsWith("property_view/")) return ok(properties);
  if (path.endsWith("filter_properties/")) {
    const city = String(params.city ?? "").toLowerCase();
    const minArea = Number(params.area) || 0;
    return ok(
      approved().filter(
        (p) =>
          (!city || String(p.city).toLowerCase().includes(city)) &&
          (!params.property_type || String(p.property_type) === String(params.property_type)) &&
          (!params.listing_type || String(p.listing_type) === String(params.listing_type)) &&
          Number(p.built_up_area) >= minArea,
      ),
    );
  }
  if (path.endsWith("property_create/")) {
    const id = String(nextId++);
    const row = withDocs({ ...body, id, slug: `property-${id}`, status: "pending", created_at: new Date().toDateString() });
    properties = [row, ...properties];
    return ok(row, "Property submitted for review.");
  }
  if (path.endsWith("property_update/")) {
    const id = String(body.id);
    if (!properties.some((p) => p.id === id)) return fail(404, "Property not found.");
    properties = properties.map((p) => (p.id === id ? { ...p, ...withDocs(body) } : p));
    return ok(null, "Property updated.");
  }
  const del = path.match(/property_delete\/([^/]+)\/$/);
  if (del && method === "DELETE") {
    properties = properties.filter((p) => p.id !== del[1]);
    return ok(null, "Property deleted.");
  }

  // ── Inquiries ──
  if (path.endsWith("inquiry_create/")) {
    const prop = properties.find((p) => p.id === String(body.property));
    if (!prop) return fail(404, "Property not found.");
    if (inquiries.some((i) => i.property === prop.id)) return fail(400, "You have already sent an inquiry for this property.");
    const row: Row = {
      id: String(nextId++), property: prop.id, property_name: prop.property_name, lead_type: "Buyer",
      buyer_name: "You", budget: "Not specified", purpose: "Investment", status: "Submitted",
      contact_state: "Contact hidden", summary: "Inquiry raised from the property page.",
      created_at: new Date().toDateString(), has_meeting_request: false, connect_requested: true,
    };
    inquiries = [row, ...inquiries];
    return ok(row, "Inquiry submitted successfully.");
  }
  if (path.endsWith("my_inquiries/") || path.endsWith("seller_received_inquiries/")) return ok(inquiries);
  if (path.endsWith("seller_request_meeting/")) {
    inquiries = inquiries.map((i) => (i.id === String(body.id) ? { ...i, has_meeting_request: true, status: "Meeting Requested" } : i));
    return ok(null, "Meeting request sent successfully.");
  }
  if (path.endsWith("operator_lead/")) {
    const status = body.action === "approve" ? "Approved" : body.action === "disapprove" ? "Rejected" : "Meeting Scheduled";
    inquiries = inquiries.map((i) =>
      i.id === String(body.id) ? { ...i, status, ...(body.meet_link ? { meet_link: body.meet_link, contact_state: "Contact shared" } : {}) } : i,
    );
    return ok(null, `Lead ${status.toLowerCase()}.`);
  }

  return fail(404, `No mock for ${method} ${url}`);
}

export const mockBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args) => {
  await delay();
  const { url, method = "GET", body, params } = typeof args === "string" ? { url: args } : args;
  return handle(url, method.toUpperCase(), toObject(body), (params as Row) ?? {});
};
