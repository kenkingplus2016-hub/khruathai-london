const ExcelJS = require('exceljs');
const fs = require('fs');

async function createTemplate() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Recipe Costing');

    // Define columns
    sheet.columns = [
        { header: 'วัตถุดิบ (Ingredient)', key: 'ingredient', width: 25 },
        { header: 'ราคา (Price)', key: 'price', width: 12 },
        { header: 'จำนวน (Pack Qty)', key: 'packQty', width: 15 },
        { header: 'หน่วย (Unit)', key: 'unit', width: 10 },
        { header: 'Yield (%)', key: 'yield', width: 10 },
        { header: 'ราคาจริง (Actual Price)', key: 'actualPrice', width: 18 },
        { header: 'ต้นทุนต่อหน่วย (Cost/Unit)', key: 'costPerUnit', width: 20 },
        { header: 'จำนวนที่ใช้ (Qty Used)', key: 'qtyUsed', width: 18 },
        { header: 'ต้นทุนที่ใช้ (Cost Used)', key: 'costUsed', width: 18 },
        { header: 'หมายเหตุ (Note)', key: 'note', width: 30 },
    ];

    // Style the header row
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1B3022' } // Khrua Thai Dark Green
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Add some sample data for rows 2 to 5
    const sampleData = [
        { ingredient: 'แป้งมันสำปะหลัง', price: 38, packQty: 500, unit: 'กรัม', yield: 99, qtyUsed: 340 },
        { ingredient: 'แป้งข้าวจ้าว', price: 34, packQty: 1000, unit: 'กรัม', yield: 99, qtyUsed: 85 },
        { ingredient: 'กะทิ', price: 60, packQty: 1000, unit: 'กรัม', yield: 99, qtyUsed: 500 },
        { ingredient: 'น้ำตาลทราย', price: 23, packQty: 1000, unit: 'กรัม', yield: 99, qtyUsed: 400 },
    ];

    sampleData.forEach((data, index) => {
        const rowNum = index + 2;
        sheet.addRow({
            ingredient: data.ingredient,
            price: data.price,
            packQty: data.packQty,
            unit: data.unit,
            yield: data.yield,
            qtyUsed: data.qtyUsed
        });
        
        // Add formulas
        sheet.getCell(`F${rowNum}`).value = { formula: `B${rowNum}/(E${rowNum}/100)` };
        sheet.getCell(`G${rowNum}`).value = { formula: `F${rowNum}/C${rowNum}` };
        sheet.getCell(`I${rowNum}`).value = { formula: `G${rowNum}*H${rowNum}` };

        // Formatting numbers
        ['B', 'C', 'F', 'G', 'H', 'I'].forEach(col => {
            sheet.getCell(`${col}${rowNum}`).numFmt = '#,##0.00';
        });
    });

    // Add empty rows with formulas (Rows 6 to 15)
    for (let i = 6; i <= 15; i++) {
        sheet.getCell(`E${i}`).value = 100; // default yield 100%
        sheet.getCell(`F${i}`).value = { formula: `IF(ISBLANK(B${i}),"",B${i}/(E${i}/100))` };
        sheet.getCell(`G${i}`).value = { formula: `IF(ISBLANK(F${i}),"",F${i}/C${i})` };
        sheet.getCell(`I${i}`).value = { formula: `IF(ISBLANK(G${i}),"",G${i}*H${i})` };
        
        ['B', 'C', 'F', 'G', 'H', 'I'].forEach(col => {
            sheet.getCell(`${col}${i}`).numFmt = '#,##0.00';
        });
    }

    // Summary Section
    const summaryStart = 17;
    
    // Other Costs (20%)
    sheet.getCell(`A${summaryStart}`).value = 'ค่าใช้จ่ายอื่นๆ (ค่าน้ำ ค่าไฟ จิปาถะ) 20%';
    sheet.getCell(`A${summaryStart}`).font = { bold: true };
    sheet.getCell(`I${summaryStart}`).value = { formula: `SUM(I2:I15)*0.2` };
    sheet.getCell(`I${summaryStart}`).numFmt = '#,##0.00';
    sheet.getCell(`I${summaryStart}`).font = { bold: true };

    // Total Cost
    sheet.getCell(`A${summaryStart+1}`).value = 'ต้นทุนรวมทั้งหมด (Total Cost)';
    sheet.getCell(`A${summaryStart+1}`).font = { bold: true };
    sheet.getCell(`I${summaryStart+1}`).value = { formula: `SUM(I2:I15)+I${summaryStart}` };
    sheet.getCell(`I${summaryStart+1}`).numFmt = '#,##0.00';
    sheet.getCell(`I${summaryStart+1}`).font = { bold: true };

    // Yield
    sheet.getCell(`A${summaryStart+2}`).value = 'จำนวนที่ทำได้ (Yield/Portions)';
    sheet.getCell(`A${summaryStart+2}`).font = { bold: true };
    sheet.getCell(`F${summaryStart+2}`).value = 15; // default 15
    sheet.getCell(`F${summaryStart+2}`).font = { bold: true, color: { argb: 'FFD4AF37' } };
    sheet.getCell(`G${summaryStart+2}`).value = 'ชุด/ชิ้น';

    // Cost Per Portion
    sheet.getCell(`A${summaryStart+3}`).value = 'ต้นทุนต่อชุด/ชิ้น (Cost per portion)';
    sheet.getCell(`A${summaryStart+3}`).font = { bold: true, color: { argb: 'FFD4AF37' } }; // Gold
    sheet.getCell(`I${summaryStart+3}`).value = { formula: `I${summaryStart+1}/F${summaryStart+2}` };
    sheet.getCell(`I${summaryStart+3}`).numFmt = '#,##0.00';
    sheet.getCell(`I${summaryStart+3}`).font = { bold: true, color: { argb: 'FFD4AF37' }, size: 14 };

    // Pricing Section
    const pricingStart = summaryStart + 5;
    
    // Header
    sheet.getCell(`A${pricingStart}`).value = 'วิเคราะห์ราคาขายและกำไร (Pricing & Profit Analysis)';
    sheet.mergeCells(`A${pricingStart}:E${pricingStart}`);
    sheet.getCell(`A${pricingStart}`).font = { bold: true, size: 12 };
    sheet.getCell(`A${pricingStart}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD4AF37' } };

    // Selling Price
    sheet.getCell(`A${pricingStart+1}`).value = 'ราคาขายต่อชุด (Selling Price)';
    sheet.getCell(`B${pricingStart+1}`).value = 15.00;
    sheet.getCell(`B${pricingStart+1}`).numFmt = '#,##0.00';
    sheet.getCell(`B${pricingStart+1}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } }; // Yellow for input
    sheet.getCell(`B${pricingStart+1}`).font = { bold: true };

    // Profit Per Portion
    sheet.getCell(`A${pricingStart+2}`).value = 'กำไรต่อชุด (Profit per portion)';
    sheet.getCell(`B${pricingStart+2}`).value = { formula: `B${pricingStart+1}-I${summaryStart+3}` };
    sheet.getCell(`B${pricingStart+2}`).numFmt = '#,##0.00';
    sheet.getCell(`B${pricingStart+2}`).font = { bold: true, color: { argb: 'FF00B050' } }; // Green

    // Total Sales
    sheet.getCell(`A${pricingStart+3}`).value = 'ยอดขายรวม (Total Sales)';
    sheet.getCell(`B${pricingStart+3}`).value = { formula: `B${pricingStart+1}*F${summaryStart+2}` };
    sheet.getCell(`B${pricingStart+3}`).numFmt = '#,##0.00';

    // Total Profit
    sheet.getCell(`A${pricingStart+4}`).value = 'กำไรรวม (Total Profit)';
    sheet.getCell(`B${pricingStart+4}`).value = { formula: `B${pricingStart+3}-I${summaryStart+1}` };
    sheet.getCell(`B${pricingStart+4}`).numFmt = '#,##0.00';
    sheet.getCell(`B${pricingStart+4}`).font = { bold: true, color: { argb: 'FF00B050' } };

    // Cost %
    sheet.getCell(`A${pricingStart+5}`).value = 'ต้นทุนคิดเป็นเปอร์เซ็นต์ (Food Cost %)';
    sheet.getCell(`B${pricingStart+5}`).value = { formula: `I${summaryStart+1}/B${pricingStart+3}` };
    sheet.getCell(`B${pricingStart+5}`).numFmt = '0.00%';
    sheet.getCell(`B${pricingStart+5}`).font = { bold: true, color: { argb: 'FFFF0000' } }; // Red

    // Write file
    const outputPath = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\Recipe_Costing_Template.xlsx';
    await workbook.xlsx.writeFile(outputPath);
    console.log('Excel file created at: ' + outputPath);
}

createTemplate().catch(console.error);
