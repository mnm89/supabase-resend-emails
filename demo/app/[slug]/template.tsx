export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col gap-4 bg-background p-6 md:p-10">
      {children}
    </div>
  );
}
