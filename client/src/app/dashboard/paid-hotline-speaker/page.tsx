import { getPaidSpeakerWithFilter } from "@/actions/paidHotline";
import PageHeading from "@/components/dashboard/common/PageHeading";
import PaidHotlineSpeakerTable from "@/components/dashboard/common/tables/PaidHotlineSpeakerTable";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function PaidHotlineSpeaker() {
  const { data: speakers, pagination } = await getPaidSpeakerWithFilter();
  console.log(speakers);
  return (
    <div>
      <PageHeading
        pageTitle="Paid Hotline Speaker"
        breadcrumbList={[
          { name: "Dashboard", href: "" },
          { name: "Paid Speaker", href: "/paid-hotline-speaker" },
        ]}
      >
        <Link href="/dashboard/paid-hotline-speaker/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Create Speaker</span>
          </Button>
        </Link>
      </PageHeading>
      <PaidHotlineSpeakerTable speakers={speakers} pagination={pagination} />
    </div>
  );
}
