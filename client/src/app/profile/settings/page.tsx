import { getUserById } from "@/actions/user";
import ProfileArea from "@/app/dashboard/account/profile/ProfileArea";
import { getSession } from "@/lib/authLib";

export default async function Settings() {
  const session = await getSession();
  const { data: user } = await getUserById(session?.id as string);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-slate-800 underline underline-offset-8">
          Settings
        </h2>
      </div>
      <ProfileArea user={user} />
    </div>
  );
}
