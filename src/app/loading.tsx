export default function Loading() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-amber" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </section>
  );
}
