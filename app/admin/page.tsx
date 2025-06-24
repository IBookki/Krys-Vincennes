import AddGlassesForm from "@/components/AddGlassesForm";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin</h1>
      <AddGlassesForm />
    </div>
  );
}