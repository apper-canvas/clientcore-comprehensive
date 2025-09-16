import { toast } from "react-toastify";

class CompanyService {
  constructor() {
    // Initialize ApperClient
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'company_c';
  }

  async getAll() {
    try {
      const params = {
fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "company_name_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "website_c"}},
          {"field": {"Name": "industry_c"}},
          {"field": {"Name": "annual_revenue_c"}},
          {"field": {"Name": "number_of_employees_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "Owner"}}
        ],
        orderBy: [{"fieldName": "CreatedDate", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching companies:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
{"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "company_name_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "website_c"}},
          {"field": {"Name": "industry_c"}},
          {"field": {"Name": "annual_revenue_c"}},
          {"field": {"Name": "number_of_employees_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "Owner"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response?.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching company ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(companyData) {
    try {
      const params = {
        records: [
{
Name: companyData.Name,
            Tags: companyData.Tags || "",
            company_name_c: companyData.company_name_c || "",
            address_c: companyData.address_c || "",
            city_c: companyData.city_c || "",
            state_c: companyData.state_c || "",
            zip_code_c: companyData.zip_code_c || "",
            website_c: companyData.website_c || "",
            industry_c: companyData.industry_c || "",
            annual_revenue_c: companyData.annual_revenue_c || null,
            number_of_employees_c: companyData.number_of_employees_c || null,
            description_c: companyData.description_c || ""
          }
        ]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} companies:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error creating company:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, companyData) {
    try {
      const params = {
        records: [
          {
            Id: id,
Name: companyData.Name,
Tags: companyData.Tags || "",
            company_name_c: companyData.company_name_c || "",
            address_c: companyData.address_c || "",
            city_c: companyData.city_c || "",
            state_c: companyData.state_c || "",
            zip_code_c: companyData.zip_code_c || "",
            website_c: companyData.website_c || "",
            industry_c: companyData.industry_c || "",
            annual_revenue_c: companyData.annual_revenue_c || null,
            number_of_employees_c: companyData.number_of_employees_c || null,
            description_c: companyData.description_c || ""
          }
        ]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} companies:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error updating company:", error?.response?.data?.message || error);
      return null;
    }
  }

  async delete(id) {
    try {
      const params = { 
        RecordIds: [id]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} companies:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0;
      }
    } catch (error) {
      console.error("Error deleting company:", error?.response?.data?.message || error);
      return false;
    }
  }
}

export const companyService = new CompanyService();