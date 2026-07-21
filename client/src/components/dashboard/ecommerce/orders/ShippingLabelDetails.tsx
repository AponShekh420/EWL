"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Truck,
  Package,
  Printer,
  Download,
  ExternalLink,
} from "lucide-react";

interface ShippingProps {
  shipping: {
    status?: string;
    methodName: string;
    servicelevel?: string | undefined;
    trackingNumber?: string | undefined;
    labelUrl?: string | undefined;
  };
}

export default function ShippingLabelCard({
  shipping,
}: ShippingProps) {
  if (shipping.status !== "label_created") return null;

  return (
    <Card className="mt-6">
      <CardContent className="space-y-5 pt-6">

        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Truck className="h-5 w-5" />
            Shipping Label
          </h2>

          <Badge>Created</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <p className="text-sm text-muted-foreground">
              Carrier
            </p>

            <p className="font-medium">
              {shipping.methodName}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Service label
            </p>

            <p className="font-medium">
              {shipping.servicelevel}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground">
              Tracking Number
            </p>

            <div className="mt-1 flex items-center gap-2">

              <Package className="h-4 w-4" />

              <span className="font-mono font-semibold">
                {shipping.trackingNumber}
              </span>

            </div>
          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          <Button asChild>
            <Link
              href={shipping.labelUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Label
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              window.open(shipping.labelUrl || "#", "_blank")
            }
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Label
          </Button>

          <Button variant="secondary" asChild>
            <Link
              href={`https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${shipping.trackingNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Track Package
            </Link>
          </Button>

        </div>

      </CardContent>
    </Card>
  );
}