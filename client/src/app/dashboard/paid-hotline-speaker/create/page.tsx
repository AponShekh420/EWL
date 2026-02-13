import PageHeading from "@/components/dashboard/common/PageHeading";
import PaidHotlineForm from "@/components/dashboard/paid-hotline-speaker/PaidHotlineForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaidHotlineSpeakerCreate() {
  return (
    <div>
      <PageHeading
        pageTitle="Paid Hotline Speaker"
        breadcrumbList={[
          { name: "Dashboard", href: "" },
          { name: "Paid Speaker", href: "/paid-hotline-speaker" },
        ]}
      >
        <Link href="/dashboard/paid-hotline-speaker">
          <Button variant="blue">
            <span>See Speakers</span>
          </Button>
        </Link>
      </PageHeading>
      <PaidHotlineForm />
    </div>
  );
}
