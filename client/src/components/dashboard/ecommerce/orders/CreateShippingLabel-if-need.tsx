"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function CreateShippingLabel() {
  // State variables for dynamic interactivity
  const [selectedPackageTab, setSelectedPackageTab] = useState<"custom" | "carrier" | "saved">("saved");
  const [dangerousGoods, setDangerousGoods] = useState<"no" | "yes">("no");
  const [selectedService, setSelectedService] = useState<string>("usps-ground");
  const [signatureReq, setSignatureReq] = useState(false);
  const [adultSignatureReq, setAdultSignatureReq] = useState(false);
  const [markComplete, setMarkComplete] = useState(true);

  // Mock rates list matching the UI
  const shippingServices = [
    {
      id: "usps-ground",
      carrier: "usps",
      name: "USPS - Ground Advantage",
      price: "$6.17",
      delivery: "2 business days",
      features: [
        "Tracking",
        "Insurance (up to $100.00)",
        "Free pickup",
      ],
      addons: [
        { id: "sig", label: "Signature Required (+$4.15)", state: signatureReq, setState: setSignatureReq },
        { id: "adult_sig", label: "Adult Signature Required (+$9.70)", state: adultSignatureReq, setState: setAdultSignatureReq },
      ],
    },
    {
      id: "ups-ground",
      carrier: "ups",
      name: "UPS® Ground",
      price: "$7.11",
      delivery: "2 business days",
      description: "Includes insurance (up to $100.00)",
    },
    {
      id: "usps-priority",
      carrier: "usps",
      name: "USPS - Priority Mail",
      price: "$8.60",
      delivery: "2 business days",
      description: "Includes tracking, insurance (up to $100.00), free pickup",
    },
    {
      id: "ups-3day",
      carrier: "ups",
      name: "UPS 3 Day Select®",
      price: "$10.97",
      delivery: "3 business days",
      description: "Includes insurance (up to $100.00)",
    },
    {
      id: "ups-2nd-day",
      carrier: "ups",
      name: "UPS 2nd Day Air®",
      price: "$11.13",
      delivery: "2 business days",
      description: "Includes insurance (up to $100.00)",
    },
    {
      id: "ups-next-day-saver",
      carrier: "ups",
      name: "UPS Next Day Air Saver®",
      price: "$26.00",
      delivery: "July 21",
      description: "Includes insurance (up to $100.00)",
    },
    {
      id: "ups-next-day",
      carrier: "ups",
      name: "UPS Next Day Air®",
      price: "$32.72",
      delivery: "July 21",
      description: "Includes insurance (up to $100.00)",
    },
    {
      id: "usps-express",
      carrier: "usps",
      name: "USPS - Express Mail",
      price: "$34.51",
      delivery: "July 21",
      description: "Includes tracking, insurance (up to $100.00), free pickup",
    },
    {
      id: "ups-next-day-early",
      carrier: "ups",
      name: "UPS Next Day Air® Early",
      price: "$62.72",
      delivery: "July 21",
      description: "Includes insurance (up to $100.00)",
    },
    {
      id: "usps-media",
      carrier: "usps",
      name: "USPS - Media Mail",
      price: "$4.39",
      delivery: "4 business days",
      description: "Books and other media only. Includes tracking",
    },
  ];

  const currentSelectedServiceObj = shippingServices.find((s) => s.id === selectedService);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 text-slate-800 text-sm">
      {/* Top Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
        <button className="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:arrow-left" className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          Create shipping label
          <span className="text-xs bg-gray-200 text-gray-700 font-normal px-2 py-0.5 rounded">
            Order 23651
          </span>
        </h1>
      </div>

      {/* Shipment Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <button className="px-4 py-2 border-b-2 border-blue-600 font-medium text-blue-600 text-xs">
          Shipment 1/1
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left / Main Section (2 Columns) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECTION 1: Items */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-base font-semibold text-slate-900">Items</h2>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-600">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-medium pb-2">
                    <th className="pb-2 font-normal">Product</th>
                    <th className="pb-2 font-normal text-center">Qty</th>
                    <th className="pb-2 font-normal text-center">Weight</th>
                    <th className="pb-2 font-normal text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded border border-gray-200 bg-gray-100 flex items-center justify-center shrink-0">
                        <Icon icon="mdi:package-variant" className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Longer Pleasure</p>
                        <p className="text-[11px] text-gray-400">6 x 6 x 13 (cm)</p>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium text-[11px]">
                        x1
                      </span>
                    </td>
                    <td className="py-4 text-center">.6 lbs</td>
                    <td className="py-4 text-right font-medium text-slate-800">$65.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Dangerous Goods Radios */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Are you shipping dangerous goods or hazardous materials?
              </p>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="dangerous"
                    checked={dangerousGoods === "no"}
                    onChange={() => setDangerousGoods("no")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  No
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="dangerous"
                    checked={dangerousGoods === "yes"}
                    onChange={() => setDangerousGoods("yes")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  Yes
                </label>
              </div>
            </div>
          </section>

          {/* SECTION 2: Package */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-5">
            <h2 className="text-base font-semibold text-slate-900">Package</h2>

            {/* Segmented Button Tabs */}
            <div className="grid grid-cols-3 border border-blue-600 rounded overflow-hidden text-center text-xs font-medium">
              <button
                type="button"
                onClick={() => setSelectedPackageTab("custom")}
                className={`py-2 ${selectedPackageTab === "custom" ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"}`}
              >
                Custom package
              </button>
              <button
                type="button"
                onClick={() => setSelectedPackageTab("carrier")}
                className={`py-2 border-x border-blue-600 ${selectedPackageTab === "carrier" ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"}`}
              >
                Carrier package
              </button>
              <button
                type="button"
                onClick={() => setSelectedPackageTab("saved")}
                className={`py-2 ${selectedPackageTab === "saved" ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"}`}
              >
                Saved templates
              </button>
            </div>

            {/* Package Template Select */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">
                Package Template
              </label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                <option>My Shipment 24.13 cm x 19.05 cm x 1.27 cm 0.6lbs</option>
              </select>
            </div>

            {/* Total Shipment Weight & Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 pt-2">
              <div className="flex-1">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">
                  Total Shipment Weight (With Package)
                </label>
                <div className="flex rounded border border-gray-300 overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">
                  <input
                    type="text"
                    defaultValue="19.20"
                    className="w-full px-3 py-2 text-xs outline-none"
                  />
                  <select className="bg-gray-50 border-l border-gray-300 px-2 text-xs text-gray-600 outline-none">
                    <option>oz</option>
                    <option>lbs</option>
                  </select>
                </div>
              </div>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-xs font-medium whitespace-nowrap">
                Get shipping rates
              </button>
            </div>
          </section>

          {/* SECTION 3: Shipping Service */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-base font-semibold text-slate-900">Shipping service</h2>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-700">
                  Carriers <Icon icon="mdi:chevron-down" />
                </button>
                <button className="flex items-center gap-1 hover:text-gray-700">
                  Sort by <Icon icon="mdi:chevron-down" />
                </button>
              </div>
            </div>

            {/* Services List */}
            <div className="space-y-3">
              {shippingServices.map((service) => {
                const isSelected = selectedService === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-4 rounded-md border cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/20 ring-1 ring-blue-600"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Carrier Icon & Details */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center bg-white shrink-0">
                          {service.carrier === "usps" ? (
                            <Icon icon="simple-icons:usps" className="w-6 h-6 text-blue-800" />
                          ) : (
                            <Icon icon="simple-icons:ups" className="w-6 h-6 text-amber-800" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 text-xs">
                            {service.name}
                          </h3>
                          
                          {/* Selected Service Features / Checkboxes */}
                          {isSelected && service.features && (
                            <ul className="mt-2 space-y-1 text-xs text-gray-600">
                              {service.features.map((feat, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <Icon icon="mdi:check" className="w-3.5 h-3.5 text-gray-500" />
                                  {feat}
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Selected Service Addons (Checkboxes) */}
                          {isSelected && service.addons && (
                            <div className="mt-2 space-y-1.5 pl-5">
                              {service.addons.map((addon) => (
                                <label
                                  key={addon.id}
                                  className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <input
                                    type="checkbox"
                                    checked={addon.state}
                                    onChange={(e) => addon.setState(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  {addon.label}
                                </label>
                              ))}
                            </div>
                          )}

                          {/* Non-selected / Generic Description */}
                          {!isSelected && service.description && (
                            <p className="text-[11px] text-gray-500 mt-1">
                              {service.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Price & Delivery timeline */}
                      <div className="text-right">
                        <span className="font-bold text-slate-900 text-sm">{service.price}</span>
                        <p className="text-[11px] text-gray-400">{service.delivery}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          
          {/* Order Details Card */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Order details</h2>

            <div className="space-y-3 text-xs">
              {/* Ship From */}
              <div className="flex justify-between items-start">
                <span className="text-gray-500">Ship from</span>
                <button className="text-blue-600 hover:underline flex items-center gap-1 text-right font-medium">
                  5 IMPERIAL LN, SPRING VALLEY, N...
                  <Icon icon="mdi:chevron-down" className="w-4 h-4" />
                </button>
              </div>

              {/* Ship To */}
              <div className="flex justify-between items-start">
                <span className="text-gray-500">Ship to</span>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 font-medium text-slate-800">
                    2707 SMITH AVE, BALTIMORE, MD
                    <Icon icon="mdi:pencil-outline" className="w-3.5 h-3.5 text-gray-500 cursor-pointer" />
                  </div>
                  <p className="text-gray-500">21209-2503, US</p>
                  <p className="text-emerald-600 text-[11px] flex items-center justify-end gap-1 mt-0.5">
                    <Icon icon="mdi:check-circle-outline" className="w-3.5 h-3.5" /> Address verified
                  </p>
                </div>
              </div>

              {/* Key Value rows */}
              <div className="flex justify-between py-1 border-t border-gray-100">
                <span className="text-gray-500">Number of items</span>
                <span className="font-medium text-slate-800">1</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Order value</span>
                <span className="font-medium text-slate-800">$65.00</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Shipping type</span>
                <span className="font-medium text-slate-800">Local pickup</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Shipping costs</span>
                <span className="font-medium text-slate-800">$0.00</span>
              </div>
            </div>

            <hr className="border-gray-100 my-2" />

            {/* Shipment Details Sub-section */}
            <div className="space-y-3 text-xs">
              <h3 className="font-semibold text-slate-900 text-xs">Shipment details</h3>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1">
                  Ship date <Icon icon="mdi:information-outline" className="text-gray-400" />
                </span>
                <button className="text-blue-600 flex items-center gap-1.5 font-medium">
                  Today (July 20)
                  <Icon icon="mdi:calendar" className="w-4 h-4" />
                </button>
              </div>

              {/* Selected summary rate */}
              <div className="flex justify-between py-1 text-gray-600">
                <span>{currentSelectedServiceObj?.name}</span>
                <span className="font-medium">{currentSelectedServiceObj?.price}</span>
              </div>

              <div className="flex justify-between font-bold text-slate-900 pt-1 text-sm border-t border-gray-100">
                <span>Total</span>
                <span>{currentSelectedServiceObj?.price}</span>
              </div>

              {/* Savings Banner */}
              <div className="bg-gray-100 rounded p-2.5 text-center text-xs text-gray-700 flex items-center justify-center gap-1">
                <span>You save $4.03 with WooCommerce Shipping.</span>
                <Icon icon="mdi:help-circle-outline" className="text-gray-500 w-4 h-4 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Action Button Section */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded shadow-sm transition-colors text-xs">
              Purchase label
            </button>

            <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={markComplete}
                onChange={(e) => setMarkComplete(e.target.checked)}
                className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>After purchasing a label, mark this order as complete and notify the customer</span>
            </label>
          </div>

        </div>

      </div>
    </div>
  );
}