import { format } from "date-fns";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import StatusBadge from "@/components/molecules/StatusBadge";
import Button from "@/components/atoms/Button";

const CompanyRow = ({ company, onEdit, onDelete }) => {
  const formatRevenue = (revenue) => {
    if (!revenue) return "N/A";
    const value = parseFloat(revenue);
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const formatEmployeeCount = (count) => {
    if (!count) return "N/A";
    return parseInt(count).toLocaleString();
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center text-white font-semibold">
            {company.Name?.[0]?.toUpperCase() || "C"}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-primary">
              {company.Name}
            </div>
            <div className="text-sm text-gray-500">
{company.company_name_c || "No company name"}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
<div className="text-sm text-primary">{company.Tags || "No tags"}</div>
      </td>
<td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-primary">
          {company.Phone && (
            <div className="flex items-center gap-1 mb-1">
              <ApperIcon name="Phone" size={14} className="text-gray-400" />
              {company.Phone}
            </div>
          )}
          {company.Email && (
            <div className="flex items-center gap-1 mb-1">
              <ApperIcon name="MapPin" size={14} className="text-gray-400" />
              {company.Email}
            </div>
          )}
          {company.Website && (
            <div className="flex items-center gap-1">
              <ApperIcon name="Globe" size={14} className="text-gray-400" />
              <a 
                href={company.Website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Website
              </a>
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-primary">
{company.city_c && company.state_c ? (
            `${company.city_c}, ${company.state_c}`
          ) : (
            company.city_c || company.state_c || "N/A"
          )}
        </div>
        <div className="text-sm text-gray-500">
{company.zip_code_c || "No zip code"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
<div className="text-xs text-gray-500">Active</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(company)}
            className="p-2"
          >
            <ApperIcon name="Edit" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(company.Id)}
            className="p-2 text-error hover:bg-error/10"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default CompanyRow;