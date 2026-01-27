export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
    </div>
  );
}
