import {
  Container,
  Header,
  Playbar,
  Sidebar,
} from "@/shared/components/shared";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Harmoniq",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main
      className="min-h-screen"
      style={{ paddingBottom: "var(--playbar-height)" }}
    >
      <Container>
        <div className="md:flex">
          <Sidebar className="md:min-w-1/6" />

          <div className="pt-6 pb-8 max-2xl:ml-10 max-xl:py-5 max-md:ml-0 max-md:p-2 md:ml-15 md:w-[80%] md:overflow-x-hidden">
            <Header />
            {children}
          </div>
        </div>
      </Container>

      <Playbar />
    </main>
  );
}
