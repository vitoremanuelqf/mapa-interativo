import { TableInstitutes } from "./table-institutions-list";

export default function Institutes() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <TableInstitutes />
      </div>
    </main>
  );
}
