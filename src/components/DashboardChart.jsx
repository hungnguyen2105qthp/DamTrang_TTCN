import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const DashboardChart = ({ id, type = "bar", title = "Thống kê cửa hàng", chartType }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    let data = null;

    switch (chartType) {
      case "sales": {
        const companySales = {};
        
        orders.forEach(order => {
          if (order.status === "completed") {
            order.products.forEach(p => {
              const company = p.company || "Khác";
              companySales[company] = (companySales[company] || 0) + (p.quantity || 0);
            });
          }
        });
        
        const sortedCompanies = Object.keys(companySales)
          .sort((a, b) => companySales[b] - companySales[a])
          .slice(0, 6); 
        
        data = {
          labels: sortedCompanies.length > 0 ? sortedCompanies : ["Chưa có dữ liệu"],
          datasets: [
            {
              label: "Số lượng bán ra",
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
              data: sortedCompanies.length > 0 
                ? sortedCompanies.map(company => companySales[company] || 0)
                : [0],
            }
          ]
        };
        break;
      }
      case "revenue": {
        const companyRevenue = {};
        
        orders.forEach(order => {
          if (order.status === "completed") {
            order.products.forEach(p => {
              const company = p.company || "Khác";
              const priceStr = p.price || "0";
              const price = parseInt(priceStr.replace(/\./g, "")) || 0;
              const quantity = p.quantity || 0;
              
              companyRevenue[company] = (companyRevenue[company] || 0) + (price * quantity);
            });
          }
        });
        
        const sortedCompanies = Object.keys(companyRevenue)
          .sort((a, b) => companyRevenue[b] - companyRevenue[a])
          .slice(0, 5); 
        
        const otherRevenue = Object.keys(companyRevenue)
          .filter(company => !sortedCompanies.includes(company))
          .reduce((sum, company) => sum + (companyRevenue[company] || 0), 0);
        
        const labels = [...sortedCompanies];
        const values = sortedCompanies.map(company => companyRevenue[company] || 0);
        
        if (otherRevenue > 0) {
          labels.push("Khác");
          values.push(otherRevenue);
        }

        if (labels.length === 0) {
          labels.push("Chưa có dữ liệu");
          values.push(0);
        }

        data = {
          labels: labels,
          datasets: [
            {
              label: "Doanh thu",
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
              data: values,
            }
          ]
        };
        break;
      }
      case "price-range": {
        const priceRanges = {
          "Dưới 3tr": 0,
          "3tr - 5tr": 0,
          "5tr - 10tr": 0,
          "10tr - 15tr": 0,
          "15tr - 20tr": 0,
          "Trên 20tr": 0
        };
        
        products.forEach(product => {
          if (!product.price) return; 
          
          const priceStr = product.price || "0";
          const price = parseInt(priceStr.replace(/\./g, "")) || 0;
          
          if (price < 3000000) priceRanges["Dưới 3tr"]++;
          else if (price < 5000000) priceRanges["3tr - 5tr"]++;
          else if (price < 10000000) priceRanges["5tr - 10tr"]++;
          else if (price < 15000000) priceRanges["10tr - 15tr"]++;
          else if (price < 20000000) priceRanges["15tr - 20tr"]++;
          else priceRanges["Trên 20tr"]++;
        });

        data = {
          labels: Object.keys(priceRanges),
          datasets: [
            {
              label: "Số lượng sản phẩm",
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              data: Object.values(priceRanges),
            }
          ]
        };
        break;
      }
      case "monthly-orders": {
        const monthlyOrders = Array(12).fill(0);
        const monthlyCompleted = Array(12).fill(0);
        
        orders.forEach(order => {
          if (!order.date) return; 
          
          const orderDate = new Date(order.date);
          if (isNaN(orderDate.getTime())) return; 
          
          const month = orderDate.getMonth();
          
          monthlyOrders[month]++;
          
          if (order.status === "completed") {
            monthlyCompleted[month]++;
          }
        });
        
        data = {
          labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
          datasets: [
            {
              label: "Tổng đơn hàng",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              data: monthlyOrders,
              fill: true,
              tension: 0.4,
            },
            {
              label: "Đơn hàng đã hoàn thành",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              data: monthlyCompleted,
              fill: true,
              tension: 0.4,
            }
          ]
        };
        break;
      }
      default: {
        data = {
          labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
          datasets: [
            {
              label: "Dữ liệu mẫu",
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              data: [65, 59, 80, 81, 56, 55],
            }
          ],
        };
      }
    }

    setChartData(data);
  }, [chartType]);

  useEffect(() => {
    if (!chartData) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: type,
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: title,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                
                if (label) {
                  label += ': ';
                }
                
                if (chartType === 'revenue') {
                  const value = context.parsed || 0;
                  label += formatCurrency(value);
                } else {
                  const value = context.parsed.y !== undefined ? context.parsed.y : (context.parsed || 0);
                  label += value;
                }
                
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                if (chartType === 'revenue' && type !== 'pie' && type !== 'doughnut') {
                  return formatCurrency(value).replace('₫', '') + ' đ';
                }
                return value;
              }
            }
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, id, type, title, chartType]);

  return (
    <div className="h-96 w-full p-4 bg-white rounded-lg shadow-md">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DashboardChart;