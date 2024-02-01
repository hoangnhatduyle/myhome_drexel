using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeMonthlyPaymentStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastRentalFee",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PaidThisMonth",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PayBill",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RentalFee",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "MonthlyPaymentId",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MonthlyPayment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserName = table.Column<string>(type: "text", nullable: true),
                    RentalFee = table.Column<int>(type: "integer", nullable: false),
                    LastRentalFee = table.Column<int>(type: "integer", nullable: false),
                    PayBill = table.Column<bool>(type: "boolean", nullable: false),
                    PaidThisMonth = table.Column<bool>(type: "boolean", nullable: false),
                    WaterBill = table.Column<int>(type: "integer", nullable: false),
                    ElectricityBill = table.Column<int>(type: "integer", nullable: false),
                    GasBill = table.Column<int>(type: "integer", nullable: false),
                    TotalMonthlyPayment = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonthlyPayment", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_MonthlyPaymentId",
                table: "AspNetUsers",
                column: "MonthlyPaymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_MonthlyPayment_MonthlyPaymentId",
                table: "AspNetUsers",
                column: "MonthlyPaymentId",
                principalTable: "MonthlyPayment",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_MonthlyPayment_MonthlyPaymentId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "MonthlyPayment");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_MonthlyPaymentId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "MonthlyPaymentId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "LastRentalFee",
                table: "AspNetUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "PaidThisMonth",
                table: "AspNetUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PayBill",
                table: "AspNetUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "RentalFee",
                table: "AspNetUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
