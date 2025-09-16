import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CompanyForm = ({ company, onSubmit, onCancel, isSubmitting = false }) => {
const [formData, setFormData] = useState({
Name: "",
    company_name_c: "",
    address_c: "",
    city_c: "",
    state_c: "",
    zip_code_c: "",
    Tags: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (company) {
setFormData({
Name: company.Name || "",
        company_name_c: company.company_name_c || "",
        address_c: company.address_c || "",
        city_c: company.city_c || "",
        state_c: company.state_c || "",
        zip_code_c: company.zip_code_c || "",
        Tags: company.Tags || ""
      });
    }
  }, [company]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.Name.trim()) {
      newErrors.Name = "Company name is required";
    }
    
if (!formData.company_name_c.trim()) {
      newErrors.company_name_c = "Company Name is required";
    }
    
    if (formData.Email && !/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.Email = "Email is invalid";
    }
    
    if (formData.Website && !formData.Website.startsWith('http')) {
      newErrors.Website = "Website must start with http:// or https://";
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
                Company Name *
              </label>
              <Input
                name="company_name_c"
                value={formData.company_name_c}
                onChange={handleChange}
                error={errors.company_name_c}
                placeholder="Enter company name"
              />
              {errors.company_name_c && (
                <p className="text-error text-sm mt-1">{errors.company_name_c}</p>
              )}
            </div>
          </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Website
              </label>
              <Input
name="Tags"
                value={formData.Tags}
                onChange={handleChange}
                error={errors.Website}
                placeholder="https://company.com"
              />
              {errors.Website && (
                <p className="text-error text-sm mt-1">{errors.Website}</p>
              )}
            </div>

<div>
              <label className="block text-sm font-medium text-primary mb-2">
                Status
              </label>
              <select
name="Tags"
                value={formData.Tags}
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
name="address_c"
                value={formData.address_c}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

<div>
              <label className="block text-sm font-medium text-primary mb-2">
                Email
              </label>
              <Input
                name="Email"
name="city_c"
                value={formData.city_c}
                onChange={handleChange}
                error={errors.Email}
                placeholder="contact@company.com"
              />
              {errors.Email && (
                <p className="text-error text-sm mt-1">{errors.Email}</p>
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
name="state_c"
                value={formData.state_c}
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
name="zip_code_c"
                value={formData.zip_code_c}
                value={formData.EmployeeCount}
                onChange={handleChange}
                placeholder="Number of employees"
              />
            </div>

<div>
              <label className="block text-sm font-medium text-primary mb-2">
                Annual Revenue
              </label>
              <Input
name="Tags"
                value={formData.Tags}
                value={formData.AnnualRevenue}
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
              name="Tags"
              value={formData.Tags}
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