// eslint-disable-next-line no-unused-vars
export default function CustomLine({ icon: Icon, text }) {
  return (
    <div className="my-2">
      <div className="h-px bg-black mt-2"></div>
      <Icon className="text-gray-400 w-5 inline" />
      <span className="mx-2 text-sm">{text}</span>
    </div>
  );
}
