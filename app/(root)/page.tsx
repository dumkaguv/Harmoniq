import { Container, Sidebar } from "@/shared/components/shared";

export default function Home() {
  return (
    <Container>
      <div className="flex">
        <Sidebar className="w-1/6" />
      </div>
    </Container>
  );
}
