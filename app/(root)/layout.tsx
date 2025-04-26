import {
  Container,
  Header,
  Playbar,
  Sidebar,
} from "@/shared/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music Player | Главная",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Container>
        <div className="flex">
          <Sidebar className="min-w-1/6" />

          <div className="ml-15 w-[80%] overflow-x-hidden pt-6 pb-8">
            <Header />
            {children}
          </div>
        </div>
      </Container>

      <Playbar />
    </main>
  );
}
