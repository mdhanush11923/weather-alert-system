export default function AlertBox({ temperature, gas }) {
  const showAlert = temperature > 37 || gas > 60;

  if (!showAlert) return null;

  return (
    <div className="bg-red-600 p-3 rounded-md text-white text-sm text-center">
      ⚠️ High Temperature or Gas Detected!
    </div>
  );
}
