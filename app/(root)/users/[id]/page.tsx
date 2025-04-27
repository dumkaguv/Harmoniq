import { UserCard } from "@/shared/components/shared";
import { Api } from "@/shared/services/api-client";

export default async function TracksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: userId } = await params;
  const user = await Api.users.fetchUser(userId);

  console.log(user);

  return (
    <div className="mt-10">
      <UserCard user={user} />
    </div>
  );
}
