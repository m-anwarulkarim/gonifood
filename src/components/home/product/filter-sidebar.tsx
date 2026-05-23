"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export type Filters = {
  specialOffers: boolean;
  availability: "all" | "in_stock" | "out_of_stock";
  minPrice: string;
  maxPrice: string;
  categories: string[];
  brands: string[];
};

export const DEFAULT_FILTERS: Filters = {
  specialOffers: false,
  availability: "all",
  minPrice: "",
  maxPrice: "",
  categories: [],
  brands: [],
};

const CATEGORY_OPTIONS = [
  { id: "khejur-gur", label: "খেজুর গুড়" },
  { id: "amlaki-bites", label: "আমলকি বাইটস" },
  { id: "kumro-bori", label: "কুমড়ো বড়ি" },
  { id: "dates", label: "Dates (খেজুর)" },
];

const BRAND_OPTIONS = [
  { id: "organic-village", label: "Organic Village" },
  { id: "khaas-food", label: "Khaas Food" },
  { id: "local-farm", label: "Local Farm" },
];

type FilterSidebarProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClearAll: () => void;
};

export default function FilterSidebar({
  filters,
  onChange,
  onClearAll,
}: FilterSidebarProps) {
  const toggleArrayValue = (
    key: "categories" | "brands",
    value: string,
    checked: boolean,
  ) => {
    const current = filters[key];
    const next = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onChange({ ...filters, [key]: next });
  };

  return (
    <aside className="h-fit w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button
          type="button"
          onClick={onClearAll}
          className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-100"
        >
          Clear All
        </button>
      </div>

      <Separator className="my-5" />

      {/* Special Offers */}
      <div className="flex items-center gap-2.5">
        <Checkbox
          id="special-offers"
          checked={filters.specialOffers}
          onCheckedChange={(checked) =>
            onChange({ ...filters, specialOffers: checked === true })
          }
        />
        <Label
          htmlFor="special-offers"
          className="cursor-pointer text-sm font-medium text-gray-800"
        >
          Special Offers
        </Label>
      </div>

      <Separator className="my-5" />

      {/* Availability */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
          Availability
        </h3>
        <RadioGroup
          value={filters.availability}
          onValueChange={(value) =>
            onChange({
              ...filters,
              availability: value as Filters["availability"],
            })
          }
          className="space-y-2"
        >
          {[
            { value: "all", label: "All Products" },
            { value: "in_stock", label: "In Stock" },
            { value: "out_of_stock", label: "Out of Stock" },
          ].map((opt) => {
            const selected = filters.availability === opt.value;
            return (
              <div key={opt.value} className="flex items-center gap-2.5">
                <RadioGroupItem
                  id={`availability-${opt.value}`}
                  value={opt.value}
                  className={selected ? "border-green-700 text-green-700" : ""}
                />
                <Label
                  htmlFor={`availability-${opt.value}`}
                  className={`cursor-pointer text-sm ${
                    selected
                      ? "font-semibold text-green-700"
                      : "font-medium text-gray-800"
                  }`}
                >
                  {opt.label}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <Separator className="my-5" />

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
          Price Range (৳)
        </h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="৳ Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            className="h-10"
          />
          <span className="text-gray-400">–</span>
          <Input
            type="number"
            inputMode="numeric"
            placeholder="৳ Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            className="h-10"
          />
        </div>
      </div>

      <Separator className="my-5" />

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
          Categories
        </h3>
        <div className="space-y-2.5">
          {CATEGORY_OPTIONS.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2.5">
              <Checkbox
                id={`cat-${opt.id}`}
                checked={filters.categories.includes(opt.id)}
                onCheckedChange={(checked) =>
                  toggleArrayValue("categories", opt.id, checked === true)
                }
              />
              <Label
                htmlFor={`cat-${opt.id}`}
                className="cursor-pointer text-sm font-medium text-gray-800"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-5" />

      {/* Brands */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
          Brands
        </h3>
        <div className="space-y-2.5">
          {BRAND_OPTIONS.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2.5">
              <Checkbox
                id={`brand-${opt.id}`}
                checked={filters.brands.includes(opt.id)}
                onCheckedChange={(checked) =>
                  toggleArrayValue("brands", opt.id, checked === true)
                }
              />
              <Label
                htmlFor={`brand-${opt.id}`}
                className="cursor-pointer text-sm font-medium text-gray-800"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
