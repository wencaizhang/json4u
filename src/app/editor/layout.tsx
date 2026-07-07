export function generateMetadata() {
  return { title: "JSON For You - Editor" };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="w-screen h-screen">{children}</main>;
}
