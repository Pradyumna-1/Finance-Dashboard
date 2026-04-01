import { useApp } from "../context/AppContext";

export default function RoleSwitcher() {
  const { role, setRole } = useApp();

  return (
    <div>
      <label className="mr-2 font-semibold">Role:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}