import { getPaidSpeakerById } from "@/actions/paidHotline";
import PageHeading from "@/components/dashboard/common/PageHeading";
import PaidHotlineForm from "@/components/dashboard/paid-hotline-speaker/PaidHotlineForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PaidHotlineSpeakerEdit({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: paidHotlineSpeaker } = await getPaidSpeakerById(id);

  return (
    <div>
      <PageHeading
        pageTitle="Paid Hotline Speaker"
        breadcrumbList={[
          { name: "Dashboard", href: "" },
          { name: "Paid Speaker", href: "/paid-hotline-speaker" },
          { name: "Create", href: "/paid-hotline-speaker/create" },
        ]}
      >
        <Link href="/dashboard/ecommerce/categories/create">
          <Button variant="blue">
            <span>See Speakers</span>
          </Button>
        </Link>
      </PageHeading>
      <PaidHotlineForm paidHotlineSpeaker={paidHotlineSpeaker} />
    </div>
  );
}
