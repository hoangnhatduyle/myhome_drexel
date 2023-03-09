using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFinancialReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ElectricityBill",
                table: "FinancialReport",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GasBill",
                table: "FinancialReport",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InsuranceBill",
                table: "FinancialReport",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InternetBill",
                table: "FinancialReport",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MobileBill",
                table: "FinancialReport",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OwedWaterBill",
                table: "FinancialReport",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WaterBill",
                table: "FinancialReport",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ElectricityBill",
                table: "FinancialReport");

            migrationBuilder.DropColumn(
                name: "GasBill",
                table: "FinancialReport");

            migrationBuilder.DropColumn(
                name: "InsuranceBill",
                table: "FinancialReport");

            migrationBuilder.DropColumn(
                name: "InternetBill",
                table: "FinancialReport");

            migrationBuilder.DropColumn(
                name: "MobileBill",
                table: "FinancialReport");

            migrationBuilder.DropColumn(
                name: "OwedWaterBill",
                table: "FinancialReport");

            migrationBuilder.DropColumn(
                name: "WaterBill",
                table: "FinancialReport");
        }
    }
}
