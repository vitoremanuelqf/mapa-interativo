import { FormCreateInstitute } from "./form-create-institute";

export default function Create() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <FormCreateInstitute />
      </div>
    </main>
  );
}
