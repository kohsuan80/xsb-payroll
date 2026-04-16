import { useState, useMemo } from “react”;

const Icons = {
Calculator: ({ size, className }) => (
<svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/>
<line x1="16" y1="10" x2="16.01" y2="10"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="8" y1="10" x2="8.01" y2="10"/>
<line x1="16" y1="14" x2="16.01" y2="14"/><line x1="12" y1="14" x2="12.01" y2="14"/><line x1="8" y1="14" x2="8.01" y2="14"/>
<line x1="16" y1="18" x2="16.01" y2="18"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="8" y1="18" x2="8.01" y2="18"/>
</svg>
),
User: ({ size, className }) => (
<svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
</svg>
),
Calendar: ({ size, className }) => (
<svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
</svg>
),
DollarSign: ({ size, className }) => (
<svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
</svg>
),
Clock: ({ size, className }) => (
<svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
</svg>
),
RefreshCcw: ({ size, className }) => (
<svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
<path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/>
</svg>
),
Download: ({ size, className }) => (
<svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
</svg>
),
Archive: ({ size, className }) => (
<svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/>
</svg>
),
Trash: ({ size, className }) => (
<svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
</svg>
),
};

const generateRecordsForMonth = (monthStr) => {
if (!monthStr) return [];
const [year, month] = monthStr.split(”-”);
const daysInMonth = new Date(year, month, 0).getDate();
const holidays2026 = {
“01-01”: “元旦”, “02-16”: “除夕”, “02-17”: “初一”, “02-18”: “初二”, “02-19”: “初三”,
“02-28”: “228紀念”, “04-04”: “兒童節”, “04-05”: “清明節”, “05-01”: “勞動節”,
“06-19”: “端午節”, “09-25”: “中秋節”, “10-10”: “國慶日”,
};
const records = [];
for (let i = 1; i <= daysInMonth; i++) {
const date = new Date(year, month - 1, i);
const dayOfWeek = date.getDay();
const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
const dayNames = [“日”, “一”, “二”, “三”, “四”, “五”, “六”];
const dateStr = `${month}-${String(i).padStart(2, "0")}`;
const holidayName = year === “2026” ? holidays2026[dateStr] : null;
records.push({
date: i,
fullDate: `${year}-${month}-${String(i).padStart(2, "0")}`,
dayOfWeek: dayNames[dayOfWeek],
isWeekend,
startTime: “”,
endTime: “”,
isDoublePay: !!holidayName,
holidayName,
});
}
return records;
};

export default function App() {
const initialMonth = new Date().toISOString().slice(0, 7);
const [formData, setFormData] = useState({ employeeName: “”, hourlyRate: “”, month: initialMonth });
const [records, setRecords] = useState(() => generateRecordsForMonth(initialMonth));
const [result, setResult] = useState(null);
const [savedRecordsList, setSavedRecordsList] = useState([]);
const [modal, setModal] = useState({ isOpen: false, title: “”, message: “”, type: “alert”, onConfirm: null });

const showAlert = (title, message) => setModal({ isOpen: true, title, message, type: “alert”, onConfirm: null });
const showConfirm = (title, message, onConfirm) => setModal({ isOpen: true, title, message, type: “confirm”, onConfirm });
const closeModal = () => setModal((p) => ({ …p, isOpen: false }));

const handleBasicInfoChange = (e) => {
const { name, value } = e.target;
setFormData((p) => ({ …p, [name]: value }));
if (name === “month”) { setRecords(generateRecordsForMonth(value)); setResult(null); }
};

const handleRecordChange = (index, field, value) => {
setRecords((p) => { const u = […p]; u[index] = { …u[index], [field]: value }; return u; });
};

const parseTimeDigits = (digits) => {
if (!digits || digits.length < 3) return null;
const padded = digits.padStart(4, “0”);
const h = parseInt(padded.slice(0, 2), 10);
const m = parseInt(padded.slice(2, 4), 10);
if (h > 23 || m > 59) return null;
return { h, m };
};

const getAmPmText = (digits) => {
const parsed = parseTimeDigits(digits);
if (!parsed) return “”;
const { h, m } = parsed;
const period = h >= 12 ? “下午” : “上午”;
const displayH = h % 12 === 0 ? 12 : h % 12;
return `${period} ${displayH}:${String(m).padStart(2, "0")}`;
};

const calculateDailyHours = (startRaw, endRaw) => {
const start = parseTimeDigits(startRaw);
const end = parseTimeDigits(endRaw);
if (!start || !end) return 0;
let s = start.h + start.m / 60;
let e = end.h + end.m / 60;
if (e <= s && e !== 0) e += 24;
return Math.floor((e - s) * 2) / 2;
};

const currentTotals = useMemo(() => {
let normalHours = 0, doubleHours = 0, workedDays = 0;
records.forEach((r) => {
const h = calculateDailyHours(r.startTime, r.endTime);
if (h > 0) { workedDays++; r.isDoublePay ? (doubleHours += h) : (normalHours += h); }
});
return { normalHours, doubleHours, totalHours: normalHours + doubleHours, workedDays };
}, [records]);

const calculateSalary = (e) => {
e.preventDefault();
if (!formData.employeeName || !formData.hourlyRate || !formData.month) { showAlert(“資料不完整”, “請填寫員工姓名與基本時薪！”); return; }
const rate = parseFloat(formData.hourlyRate);
if (isNaN(rate)) { showAlert(“格式錯誤”, “基本時薪必須為有效數字！”); return; }
if (currentTotals.totalHours === 0) { showAlert(“資料空白”, “您尚未填寫任何有效的上下班時間！”); return; }
const normalPay = rate * currentTotals.normalHours;
const doublePay = rate * 2 * currentTotals.doubleHours;
const newResult = {
name: formData.employeeName, month: formData.month, rate,
normalHours: currentTotals.normalHours, doubleHours: currentTotals.doubleHours,
totalHours: currentTotals.totalHours, normalPay: Math.round(normalPay),
doublePay: Math.round(doublePay), total: Math.round(normalPay + doublePay),
};
setResult(newResult);
const slipData = { id: `${formData.employeeName}-${formData.month}`, formData: JSON.parse(JSON.stringify(formData)), records: JSON.parse(JSON.stringify(records)), result: newResult };
setSavedRecordsList((p) => { const i = p.findIndex((s) => s.id === slipData.id); if (i >= 0) { const n = […p]; n[i] = slipData; return n; } return […p, slipData]; });
};

const loadSavedRecord = (slip) => {
showConfirm(“載入暫存紀錄”, `確定要載入 [${slip.formData.employeeName} ${slip.formData.month}] 的暫存紀錄嗎？\n目前編輯中的內容將會被覆蓋！`, () => {
setFormData(JSON.parse(JSON.stringify(slip.formData)));
setRecords(JSON.parse(JSON.stringify(slip.records)));
setResult(JSON.parse(JSON.stringify(slip.result)));
closeModal();
});
};

const deleteSavedRecord = (slip) => {
showConfirm(“刪除暫存紀錄”, `確定要刪除 [${slip.formData.employeeName} ${slip.formData.month}] 嗎？\n此動作無法復原！`, () => {
setSavedRecordsList((p) => p.filter((s) => s.id !== slip.id));
closeModal();
});
};

const exportToCSV = () => {
if (!formData.employeeName || !formData.month) { showAlert(“資料不完整”, “請先填寫員工姓名與結算月份才能匯出！”); return; }
const rate = parseFloat(formData.hourlyRate) || 0;
const total = Math.round(rate * currentTotals.normalHours + rate * 2 * currentTotals.doubleHours);
let csv = “員工姓名,結算月份,基本時薪,累計上班天數,一般時數,雙薪時數,總計時數,應付總額\n”;
csv += `${formData.employeeName},${formData.month},${rate},${currentTotals.workedDays},${currentTotals.normalHours},${currentTotals.doubleHours},${currentTotals.totalHours},${total}\n\n`;
csv += “日期,星期,上班時間,下班時間,小計工時(hr),雙薪日\n”;
records.forEach((r) => {
const h = calculateDailyHours(r.startTime, r.endTime);
csv += `${r.fullDate},${r.dayOfWeek},${r.startTime ? getAmPmText(r.startTime) : ""},${r.endTime ? getAmPmText(r.endTime) : ""},${h > 0 ? h : ""},${r.isDoublePay ? "是" : "否"}\n`;
});
const blob = new Blob([”\uFEFF” + csv], { type: “text/csv;charset=utf-8;” });
const a = document.createElement(“a”);
a.href = URL.createObjectURL(blob);
a.download = `${formData.employeeName}_${formData.month}_薪資班表.csv`;
a.click();
};

const clearForm = () => {
showConfirm(“確認清空”, “確定要清除目前畫面上的所有資料嗎？\n(已暫存的紀錄不受影響)”, () => {
setFormData((p) => ({ …p, employeeName: “”, hourlyRate: “” }));
setRecords(generateRecordsForMonth(formData.month));
setResult(null);
closeModal();
});
};

return (
<div style={{ fontFamily: “‘Noto Sans TC’, sans-serif” }} className=“min-h-screen bg-gray-100 flex items-center justify-center p-0 md:p-6”>
<div className="bg-white md:rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden border border-gray-200">

```
    {/* Header */}
    <div className="bg-blue-700 px-6 py-5 text-white flex items-center justify-center gap-3">
      <Icons.Calculator size={32} className="text-blue-200" />
      <h1 className="text-xl font-bold tracking-wider">呷尚寶新泰店薪資系統</h1>
    </div>

    <div className="flex flex-col lg:flex-row">

      {/* 左側 */}
      <div className="w-full lg:w-80 flex-shrink-0 p-5 bg-gray-50 border-r border-gray-200 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "88vh" }}>
        <form onSubmit={calculateSalary} className="space-y-4">

          {/* 月份 */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">結算月份</label>
            <div className="relative">
              <Icons.Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="month" name="month" value={formData.month} onChange={handleBasicInfoChange} required
                className="pl-9 w-full rounded-lg border border-gray-300 py-2 px-3 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                style={{ maxWidth: "100%", boxSizing: "border-box" }} />
            </div>
          </div>

          {/* 姓名 */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">員工姓名</label>
            <div className="relative">
              <Icons.User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" name="employeeName" value={formData.employeeName} onChange={handleBasicInfoChange} placeholder="請輸入姓名" required
                className="pl-9 w-full rounded-lg border border-gray-300 py-2 px-3 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
          </div>

          {/* 時薪 */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">基本時薪 (NT$)</label>
            <div className="relative">
              <Icons.DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="number" name="hourlyRate" min="0" step="1" value={formData.hourlyRate} onChange={handleBasicInfoChange} placeholder="例如: 183" required
                className="pl-9 w-full rounded-lg border border-gray-300 py-2 px-3 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
          </div>

          {/* 累計工時 */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-1 text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
              <Icons.Clock size={14} /> 目前累計工時
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">一般時數</span>
                <span className="font-semibold">{currentTotals.normalHours.toFixed(2)} hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">雙薪時數</span>
                <span className="font-semibold text-orange-500">{currentTotals.doubleHours.toFixed(2)} hr</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-blue-200 font-bold">
                <span>總計時數</span>
                <span className="text-blue-700">{currentTotals.totalHours.toFixed(2)} hr</span>
              </div>
            </div>
          </div>

          {/* 上班天數 */}
          <div className="bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-100 flex justify-between items-center">
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Icons.Calendar size={14} /> 累計上班天數
            </div>
            <span className="text-xl font-black text-emerald-600">{currentTotals.workedDays} <span className="text-sm font-medium">天</span></span>
          </div>

          {/* 按鈕群 */}
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={clearForm}
              className="flex items-center justify-center gap-1 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors">
              <Icons.RefreshCcw size={14} /> 清空
            </button>
            <button type="button" onClick={exportToCSV}
              className="flex items-center justify-center gap-1 py-2 rounded-lg border border-emerald-400 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">
              <Icons.Download size={14} /> 匯出
            </button>
            <button type="submit"
              className="col-span-2 flex items-center justify-center py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm">
              產生薪資單
            </button>
          </div>
        </form>

        {/* 薪資結果 */}
        {result && (
          <div className="bg-white rounded-xl border-2 border-blue-500 shadow-md p-4">
            <h3 className="text-sm font-bold text-blue-900 mb-3 pb-2 border-b">本月薪資結算明細</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-gray-400 shrink-0">姓名/月份</span>
                <span className="font-bold text-right text-xs">{result.name} ({result.month})</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-400 shrink-0">一般薪資</span>
                <span className="text-right text-xs">${result.rate}×{result.normalHours}h = ${result.normalPay.toLocaleString()}</span>
              </div>
              {result.doubleHours > 0 && (
                <div className="flex justify-between gap-2 text-orange-600">
                  <span className="shrink-0">雙薪薪資</span>
                  <span className="text-right text-xs">${result.rate * 2}×{result.doubleHours}h = ${result.doublePay.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-end pt-2 border-t border-dashed gap-2">
                <span className="font-bold text-gray-700 shrink-0">應付總額</span>
                <span className="text-2xl font-black text-blue-600">NT$ {result.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* 暫存清單 */}
        {savedRecordsList.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-1 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              <Icons.Archive size={14} /> 暫存薪資檔
            </div>
            <div className="flex flex-col gap-2">
              {savedRecordsList.map((slip) => (
                <div key={slip.id} className="relative flex group">
                  <button type="button" onClick={() => loadSavedRecord(slip)}
                    className="flex-1 text-left p-3 pr-9 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-200 text-sm flex justify-between items-center transition-colors">
                    <div>
                      <span className="font-bold text-blue-800 mr-1">{slip.formData.employeeName}</span>
                      <span className="text-gray-400 text-xs">{slip.formData.month}</span>
                    </div>
                    <span className="font-bold text-gray-700 text-xs">${slip.result.total.toLocaleString()}</span>
                  </button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); deleteSavedRecord(slip); }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                    <Icons.Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 右側班表 */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center flex-shrink-0">
          <h2 className="text-sm font-bold text-gray-700">每日出勤紀錄</h2>
          <span className="text-xs text-gray-400">輸入24小時數字 (例: 0900)</span>
        </div>

        {/* 欄位標題 */}
        <div className="grid gap-1 px-3 py-2 bg-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 flex-shrink-0"
          style={{ gridTemplateColumns: "48px 1fr 1fr 44px 44px" }}>
          <div>日期</div>
          <div className="text-center">上班</div>
          <div className="text-center">下班</div>
          <div className="text-right">小計</div>
          <div className="text-center">雙薪</div>
        </div>

        {/* 班表列表 */}
        <div className="overflow-y-auto flex-1" style={{ maxHeight: "calc(88vh - 120px)" }}>
          {records.map((record, index) => {
            const dailyHours = calculateDailyHours(record.startTime, record.endTime);
            return (
              <div key={record.date}
                className={`grid gap-1 px-3 py-1.5 items-center border-b border-gray-100 hover:bg-blue-50 transition-colors
                  ${record.isWeekend ? "bg-orange-50" : ""}
                  ${dailyHours > 0 ? "bg-blue-50" : ""}
                `}
                style={{ gridTemplateColumns: "48px 1fr 1fr 44px 44px" }}>

                {/* 日期 */}
                <div className="flex flex-col">
                  <span className="font-bold text-gray-700 text-sm leading-none">{String(record.date).padStart(2, "0")}</span>
                  <div className="flex flex-wrap gap-0.5 mt-0.5">
                    <span className={`text-[10px] px-1 py-0.5 rounded leading-none ${record.isWeekend ? "bg-orange-100 text-orange-600 font-bold" : "bg-gray-200 text-gray-500"}`}>
                      {record.dayOfWeek}
                    </span>
                    {record.holidayName && (
                      <span className="text-[9px] bg-red-100 text-red-500 font-bold px-1 py-0.5 rounded leading-none whitespace-nowrap">
                        {record.holidayName}
                      </span>
                    )}
                  </div>
                </div>

                {/* 上班 */}
                <div className="flex flex-col">
                  <input id={`s-${index}`} type="text" inputMode="numeric" maxLength={4} placeholder="0900" value={record.startTime}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      handleRecordChange(index, "startTime", v);
                      if (v.length === 4) document.getElementById(`e-${index}`)?.focus();
                    }}
                    className="w-full text-sm rounded border border-gray-200 py-1 text-center font-mono bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none shadow-sm" />
                  <span className="text-[10px] text-blue-500 font-semibold text-center mt-0.5 h-3 leading-none">
                    {getAmPmText(record.startTime)}
                  </span>
                </div>

                {/* 下班 */}
                <div className="flex flex-col">
                  <input id={`e-${index}`} type="text" inputMode="numeric" maxLength={4} placeholder="1830" value={record.endTime}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      handleRecordChange(index, "endTime", v);
                      if (v.length === 4 && index < records.length - 1) document.getElementById(`s-${index + 1}`)?.focus();
                    }}
                    className="w-full text-sm rounded border border-gray-200 py-1 text-center font-mono bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none shadow-sm" />
                  <span className="text-[10px] text-blue-500 font-semibold text-center mt-0.5 h-3 leading-none">
                    {getAmPmText(record.endTime)}
                  </span>
                </div>

                {/* 小計 */}
                <div className="text-right">
                  {dailyHours > 0
                    ? <span className="text-sm font-bold text-blue-600">{dailyHours.toFixed(1)}</span>
                    : <span className="text-gray-300 text-sm">-</span>}
                </div>

                {/* 雙薪 toggle */}
                <div className="flex justify-center">
                  <button type="button" onClick={() => handleRecordChange(index, "isDoublePay", !record.isDoublePay)}
                    className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 ${record.isDoublePay ? "bg-orange-400" : "bg-gray-300"}`}>
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${record.isDoublePay ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-400 flex-shrink-0">
          直接輸入數字即可（0930 = 上午 9:30）。2026 年國定假日已自動設為雙薪日。
        </div>
      </div>
    </div>

    {/* Modal */}
    {modal.isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
          <div className={`px-5 py-4 font-bold text-white text-sm ${modal.type === "alert" ? "bg-orange-500" : "bg-blue-600"}`}>
            {modal.title}
          </div>
          <div className="px-5 py-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {modal.message}
          </div>
          <div className="px-5 py-3 bg-gray-50 flex justify-end gap-2 border-t border-gray-100">
            {modal.type === "confirm" && (
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                取消
              </button>
            )}
            <button onClick={() => { if (modal.onConfirm) modal.onConfirm(); else closeModal(); }}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${modal.type === "alert" ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"}`}>
              確定
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
```

);
}
