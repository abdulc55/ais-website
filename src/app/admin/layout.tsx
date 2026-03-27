export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        body > nav, body > footer, body > header { display: none !important; }
        body > main { padding-top: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
