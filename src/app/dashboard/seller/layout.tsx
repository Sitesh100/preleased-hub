export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout intentionally renders NO Navbar / Footer.
  // The root layout wraps every page, so we render children
  // inside a full-screen container that overrides that chrome.
  return (
    <div className="fixed inset-0 z-40 bg-white">
      {children}
    </div>
  );
}