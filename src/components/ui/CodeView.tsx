import { useStore } from "../../store";

const CodeView = () => {
  const { isCodeViewActive } = useStore();

  if (!isCodeViewActive) return null;

  // Sample Terraform code for the AWS infrastructure
  const terraformCode = `# AWS Infrastructure as Code
# This is a simplified example of how this portfolio environment 
# could be created using Terraform

provider "aws" {
  region = "us-east-1"
}

# VPC for the main environment
resource "aws_vpc" "portfolio_vpc" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "Portfolio VPC"
  }
}

# Create subnets for projects
resource "aws_subnet" "project_subnets" {
  count = 4
  vpc_id = aws_vpc.portfolio_vpc.id
  cidr_block = "10.0.\${count.index}.0/24"
  
  tags = {
    Name = "Project Subnet \${count.index}"
  }
}

# EC2 instances for projects
resource "aws_instance" "project_instances" {
  for_each = {
    securescale = { name = "SecureScale", instance_type = "t3.medium" }
    gohaul = { name = "GoHaul", instance_type = "t3.small" }
    jakshenterprise = { name = "Jaksh Enterprise", instance_type = "t3.medium" }
  }
  
  ami = "ami-0c55b159cbfafe1f0"
  instance_type = each.value.instance_type
  subnet_id = aws_subnet.project_subnets[0].id
  
  tags = {
    Name = each.value.name
    Category = "Project"
  }
}

# Lambda functions for skills
resource "aws_lambda_function" "skill_functions" {
  for_each = {
    aws = { name = "AWS", runtime = "nodejs16.x" }
    terraform = { name = "Terraform", runtime = "python3.9" }
    react = { name = "React", runtime = "nodejs16.x" }
    nodejs = { name = "NodeJS", runtime = "nodejs16.x" }
    mongodb = { name = "MongoDB", runtime = "nodejs16.x" }
  }
  
  function_name = "skill-\${each.key}"
  handler = "index.handler"
  runtime = each.value.runtime
  
  tags = {
    Name = each.value.name
    Category = "Skill"
  }
}

# S3 buckets for education
resource "aws_s3_bucket" "education_buckets" {
  for_each = {
    northeastern = { name = "Northeastern University" }
    daiict = { name = "Dhirubhai Ambani Institute" }
  }
  
  bucket = "education-\${each.key}"
  
  tags = {
    Name = each.value.name
    Category = "Education"
  }
}

# RDS instances for experience
resource "aws_db_instance" "experience_databases" {
  for_each = {
    pitney = { name = "Pitney Bowes", engine = "postgres" }
    jaksh = { name = "Jaksh Enterprise", engine = "mysql" }
  }
  
  identifier = "experience-\${each.key}"
  engine = each.value.engine
  instance_class = "db.t3.micro"
  allocated_storage = 20
  
  tags = {
    Name = each.value.name
    Category = "Experience"
  }
}

# Output the environment URL
output "portfolio_url" {
  value = "https://cloudscape-portfolio.example.com"
  description = "URL to access the portfolio"
}`;

  return (
    <div className="fixed inset-0 bg-primary/95 text-background z-30 overflow-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1E1E1E] rounded-lg overflow-hidden shadow-xl">
          {/* Code header with tabs */}
          <div className="flex items-center bg-[#252526] text-[#CCCCCC] text-sm">
            <div className="px-4 py-2 bg-[#1E1E1E] border-t-2 border-secondary">
              main.tf
            </div>
            <div className="px-4 py-2">variables.tf</div>
            <div className="px-4 py-2">outputs.tf</div>
          </div>

          {/* Code content */}
          <div className="p-4 overflow-x-auto font-mono text-sm">
            <pre className="whitespace-pre-wrap text-[#D4D4D4]">
              {terraformCode}
            </pre>
          </div>
        </div>

        <div className="mt-4 text-right">
          <p className="text-xs text-background/60 mb-2">
            This is a simplified representation of how this portfolio could be
            deployed using Infrastructure as Code.
          </p>
          <button
            onClick={() => useStore.getState().toggleCodeView()}
            className="bg-secondary hover:bg-secondary/80 text-primary px-3 py-1 rounded text-sm">
            Close Code View
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeView;
