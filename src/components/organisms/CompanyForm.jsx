import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CompanyForm = ({ company, onSubmit, onCancel, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    Name: "",
    industry_c: "",
    website_c: "",
    phone_c: "",
    email_c: "",
    address_c: "",
    city_c: "",
    state_c: "",
    zip_code_c: "",
    country_c: "",
    employee_count_c: "",
    annual_revenue_c: "",
    status_c: "Active",
    tags_c: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (company) {
      setFormData({
        Name: company.Name || "",
        industry_c: company.industry_c || "",
        website_c: company.website_c || "",
        phone_c: company.phone_c || "",
        email_c: company.email_c || "",
        address_c: company.address_c || "",
        city_c: company.city_c || "",
        state_c: company.state_c || "",
        zip_code_c: company.zip_code_c || "",
        country_c: company.country_c || "",
        employee_count_c: company.employee_count_c || "",
        annual_revenue_c: company.annual_revenue_c || "",
        status_c: company.status_c || "Active",
        tags_c: company.tags_c || ""
      });
    }
  }, [company]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.Name.trim()) {
      newErrors.Name = "Company name is required";
    }
    
    if (!formData.industry_c.trim()) {
      newErrors.industry_c = "Industry is required";
    }
    
    if (formData.email_c && !/\S+@\S+\.\S+/.test(formData.email_c)) {
      newErrors.email_c = "Email is invalid";
    }
    
    if (formData.website_c && !formData.website_c.startsWith('http')) {
      newErrors.website_c = "Website must start with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">
          {company ? "Edit Company" : "Add New Company"}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="p-2"
        >
          <ApperIcon name="X" size={20} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Company Name *
              </label>
              <Input
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                error={errors.Name}
                placeholder="Enter company name"
              />
              {errors.Name && (
                <p className="text-error text-sm mt-1">{errors.Name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Industry *
              </label>
              <Input
                name="industry_c"
                value={formData.industry_c}
                onChange={handleChange}
                error={errors.industry_c}
                placeholder="e.g., Technology, Healthcare"
              />
              {errors.industry_c && (
                <p className="text-error text-sm mt-1">{errors.industry_c}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Website
              </label>
              <Input
                name="website_c"
                value={formData.website_c}
                onChange={handleChange}
                error={errors.website_c}
                placeholder="https://company.com"
              />
              {errors.website_c && (
                <p className="text-error text-sm mt-1">{errors.website_c}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Status
              </label>
              <select
                name="status_c"
                value={formData.status_c}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border-2 border-gray-200 bg-surface text-primary focus:border-accent focus:outline-none transition-colors duration-200"
              >
                <option value="Active">Active</option>
                <option value="Prospect">Prospect</option>
                <option value="Customer">Customer</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Phone
              </label>
              <Input
                name="phone_c"
                value={formData.phone_c}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Email
              </label>
              <Input
                name="email_c"
                type="email"
                value={formData.email_c}
                onChange={handleChange}
                error={errors.email_c}
                placeholder="contact@company.com"
              />
              {errors.email_c && (
                <p className="text-error text-sm mt-1">{errors.email_c}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Address Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Street Address
            </label>
            <Input
              name="address_c"
              value={formData.address_c}
              onChange={handleChange}
              placeholder="Enter street address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                City
              </label>
              <Input
                name="city_c"
                value={formData.city_c}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                State
              </label>
              <Input
                name="state_c"
                value={formData.state_c}
                onChange={handleChange}
                placeholder="Enter state"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                ZIP Code
              </label>
              <Input
                name="zip_code_c"
                value={formData.zip_code_c}
                onChange={handleChange}
                placeholder="Enter ZIP"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Country
              </label>
              <Input
                name="country_c"
                value={formData.country_c}
                onChange={handleChange}
                placeholder="Enter country"
              />
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Company Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Employee Count
              </label>
              <Input
                name="employee_count_c"
                type="number"
                value={formData.employee_count_c}
                onChange={handleChange}
                placeholder="Number of employees"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Annual Revenue
              </label>
              <Input
                name="annual_revenue_c"
                type="number"
                value={formData.annual_revenue_c}
                onChange={handleChange}
                placeholder="Annual revenue in USD"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Tags
            </label>
            <Input
              name="tags_c"
              value={formData.tags_c}
              onChange={handleChange}
              placeholder="Enter tags separated by commas"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : (company ? "Update Company" : "Add Company")}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CompanyForm;