import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60), 0, 0);
  return d;
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  await prisma.expense.deleteMany();
  await prisma.fuelLog.deleteMany();
  await prisma.maintenanceLog.deleteMany();
  await prisma.vehicleDocument.deleteMany();
  await prisma.vehiclePosition.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();
  await prisma.settings.deleteMany();

  const password = await bcrypt.hash("password123", 10);

  await prisma.user.createMany({
    data: [
      { name: "Rajesh Kumar", email: "admin@transitops.com", passwordHash: password, role: "SUPER_ADMIN" },
      { name: "Amit Sharma", email: "fleetmanager@transitops.com", passwordHash: password, role: "FLEET_MANAGER" },
      { name: "Priya Verma", email: "dispatcher@transitops.com", passwordHash: password, role: "DISPATCHER" },
      { name: "Suresh Nair", email: "safety@transitops.com", passwordHash: password, role: "SAFETY_OFFICER" },
      { name: "Ananya Gupta", email: "finance@transitops.com", passwordHash: password, role: "FINANCIAL_ANALYST" },
    ],
  });

  await prisma.settings.create({
    data: {
      depotName: "Mumbai Central Depot",
      currency: "INR",
      distanceUnit: "km",
      rolePermissions: JSON.stringify({
        FLEET_MANAGER: ["dashboard", "fleet", "maintenance", "analytics", "settings", "audit"],
        DISPATCHER: ["dashboard", "trips", "audit"],
        SAFETY_OFFICER: ["dashboard", "drivers", "safety"],
        FINANCIAL_ANALYST: ["dashboard", "fuelExpenses", "analytics"],
      }),
    },
  });

  const vehicles = await Promise.all([
    prisma.vehicle.create({ data: { registrationNumber: "MH 01 AB 1234", nameModel: "Tata Ace Gold", type: "MINI", maxLoadCapacityKg: 750, odometerKm: 34500, acquisitionCost: 585000, region: "West — Mumbai", latitude: 19.0760, longitude: 72.8777, status: "AVAILABLE" } }),
    prisma.vehicle.create({ data: { registrationNumber: "DL 03 CD 5678", nameModel: "Eicher Pro 2049", type: "TRUCK", maxLoadCapacityKg: 5000, odometerKm: 67800, acquisitionCost: 1650000, region: "North — Delhi", latitude: 28.6139, longitude: 77.2090, status: "AVAILABLE" } }),
    prisma.vehicle.create({ data: { registrationNumber: "KA 01 EF 9012", nameModel: "Mahindra Bolero Pikup", type: "VAN", maxLoadCapacityKg: 1000, odometerKm: 52300, acquisitionCost: 850000, region: "South — Bangalore", latitude: 12.9716, longitude: 77.5946, status: "ON_TRIP" } }),
    prisma.vehicle.create({ data: { registrationNumber: "TN 02 GH 3456", nameModel: "Ashok Leyland Dost+", type: "VAN", maxLoadCapacityKg: 1200, odometerKm: 41200, acquisitionCost: 720000, region: "South — Chennai", latitude: 13.0827, longitude: 80.2707, status: "IN_SHOP" } }),
    prisma.vehicle.create({ data: { registrationNumber: "GJ 01 IJ 7890", nameModel: "BharatBenz 1617", type: "TRUCK", maxLoadCapacityKg: 16000, odometerKm: 112400, acquisitionCost: 2200000, region: "West — Ahmedabad", latitude: 23.0225, longitude: 72.5714, status: "AVAILABLE" } }),
    prisma.vehicle.create({ data: { registrationNumber: "UP 14 KL 2345", nameModel: "Force Traveller 3350", type: "VAN", maxLoadCapacityKg: 2000, odometerKm: 28900, acquisitionCost: 1150000, region: "North — Lucknow", latitude: 26.8467, longitude: 80.9462, status: "AVAILABLE" } }),
    prisma.vehicle.create({ data: { registrationNumber: "RJ 14 MN 6789", nameModel: "Tata Signa 4825", type: "TRUCK", maxLoadCapacityKg: 25000, odometerKm: 189000, acquisitionCost: 3500000, region: "West — Jaipur", latitude: 26.9124, longitude: 75.7873, status: "RETIRED" } }),
    prisma.vehicle.create({ data: { registrationNumber: "AP 09 OP 1122", nameModel: "Maruti Eeco Cargo", type: "MINI", maxLoadCapacityKg: 600, odometerKm: 15600, acquisitionCost: 495000, region: "South — Hyderabad", latitude: 17.3850, longitude: 78.4867, status: "AVAILABLE" } }),
  ]);

  const drivers = await Promise.all([
    prisma.driver.create({ data: { name: "Arjun Singh", licenseNumber: "DL-20190012345", licenseCategory: "HMV", licenseExpiryDate: new Date("2029-03-15"), contactNumber: "+91-9876543210", safetyScore: 96, status: "AVAILABLE" } }),
    prisma.driver.create({ data: { name: "Meena Devi", licenseNumber: "MH-20200054321", licenseCategory: "LMV", licenseExpiryDate: new Date("2028-07-20"), contactNumber: "+91-9812345678", safetyScore: 92, status: "AVAILABLE" } }),
    prisma.driver.create({ data: { name: "Ravi Shankar", licenseNumber: "KA-20180098765", licenseCategory: "HMV", licenseExpiryDate: new Date("2025-11-30"), contactNumber: "+91-9900112233", safetyScore: 87, status: "ON_TRIP" } }),
    prisma.driver.create({ data: { name: "Fatima Begum", licenseNumber: "TN-20210034567", licenseCategory: "LMV", licenseExpiryDate: new Date("2026-06-10"), contactNumber: "+91-9444556677", safetyScore: 94, status: "AVAILABLE" } }),
    prisma.driver.create({ data: { name: "Suresh Patel", licenseNumber: "GJ-20200076543", licenseCategory: "HMV", licenseExpiryDate: new Date("2025-09-01"), contactNumber: "+91-9777889900", safetyScore: 78, status: "SUSPENDED" } }),
    prisma.driver.create({ data: { name: "Kavita Joshi", licenseNumber: "UP-20220011223", licenseCategory: "LMV", licenseExpiryDate: new Date("2030-01-25"), contactNumber: "+91-9666778899", safetyScore: 98, status: "AVAILABLE" } }),
    prisma.driver.create({ data: { name: "Mohammed Ali", licenseNumber: "RJ-20190044556", licenseCategory: "HMV", licenseExpiryDate: new Date("2025-12-20"), contactNumber: "+91-9555667788", safetyScore: 85, status: "OFF_DUTY" } }),
  ]);

  const activeDrivers = [drivers[0], drivers[1], drivers[3], drivers[5]];
  const activeVehicles = [vehicles[0], vehicles[1], vehicles[2], vehicles[4], vehicles[5], vehicles[7]];

  const routes = [
    { source: "Mumbai Central Depot", destination: "Delhi NCR Warehouse", distKm: 1400, fuelL: 180, toll: 2350 },
    { source: "Bangalore Silk Board", destination: "Chennai Ambattur Industrial", distKm: 350, fuelL: 45, toll: 485 },
    { source: "Mumbai Central Depot", destination: "Pune Bhosari Industrial Area", distKm: 150, fuelL: 20, toll: 180 },
    { source: "Ahmedabad Naroda", destination: "Jaipur Sitapura Industrial", distKm: 670, fuelL: 90, toll: 1100 },
    { source: "Hyderabad Miyapur", destination: "Bangalore Peenya Industrial", distKm: 570, fuelL: 72, toll: 850 },
    { source: "Delhi NCR Warehouse", destination: "Lucknow Industrial Gate", distKm: 550, fuelL: 70, toll: 780 },
    { source: "Chennai Ambattur Industrial", destination: "Coimbatore Peedam", distKm: 500, fuelL: 62, toll: 650 },
    { source: "Mumbai Central Depot", destination: "Ahmedabad Naroda", distKm: 530, fuelL: 68, toll: 720 },
    { source: "Bangalore Peenya Industrial", destination: "Hyderabad Miyapur", distKm: 570, fuelL: 72, toll: 850 },
    { source: "Jaipur Sitapura Industrial", destination: "Delhi NCR Warehouse", distKm: 270, fuelL: 35, toll: 380 },
    { source: "Lucknow Industrial Gate", destination: "Kanpur Logix Mall", distKm: 80, fuelL: 10, toll: 90 },
    { source: "Pune Bhosari Industrial Area", destination: "Mumbai Central Depot", distKm: 150, fuelL: 20, toll: 180 },
  ];

  const garageNames = [
    "Mumbai Tata Service, Andheri", "Delhi Truck Service Center, Wazirabad",
    "Chennai Auto Works, Ambattur", "Bangalore Ashok Leyland, Peenya",
    "Ahmedabad BharatBenz Dealer", "Jaipur Heavy Vehicles Garage",
    "Hyderabad Maruti Service, Miyapur", "Lucknow Force Motors Service",
  ];
  const serviceTypes = ["Oil Change & Filter", "Brake Pad Replacement", "Engine Overhaul", "Clutch Plate Change", "Tyre Replacement (6 tyres)", "AC Compressor Repair", "Battery Replacement", "Suspension Repair", "Radiator Flush", "Gearbox Service"];

  const tripData: { tripCode: string; source: string; destination: string; vehicleId: string; driverId: string; cargoWeightKg: number; plannedDistanceKm: number; status: "DRAFT" | "DISPATCHED" | "COMPLETED" | "CANCELLED"; dispatchedAt: Date; completedAt?: Date; finalOdometerKm?: number; fuelConsumedL?: number; revenue?: number; cancelReason?: string }[] = [];
  const fuelData: { vehicleId: string; tripId?: string; date: Date; liters: number; cost: number }[] = [];
  const maintenanceData: { vehicleId: string; serviceType: string; servicerName: string; cost: number; date: Date; status: "ACTIVE" | "COMPLETED" }[] = [];
  const expenseData: { vehicleId: string; tripId?: string; toll: number; otherMisc: number; total: number; status: "PENDING" | "COMPLETED" }[] = [];

  let tripCounter = 1;

  for (let dayOffset = 90; dayOffset >= 0; dayOffset--) {
    const numTrips = randomBetween(1, 3);
    for (let t = 0; t < numTrips; t++) {
      const route = routes[randomBetween(0, routes.length - 1)];
      const vehicle = activeVehicles[randomBetween(0, activeVehicles.length - 1)];
      const driver = activeDrivers[randomBetween(0, activeDrivers.length - 1)];
      const cargoPercent = randomBetween(40, 95);
      const cargo = Math.round((vehicle.maxLoadCapacityKg * cargoPercent) / 100);
      const revenue = Math.round(route.distKm * 28 + cargo * 3.5);
      const cost = Math.round(route.fuelL * 94 + route.toll + randomBetween(200, 800));
      const isCompleted = dayOffset > 2;
      const isCancelled = !isCompleted && Math.random() < 0.15;
      const status: "DRAFT" | "DISPATCHED" | "COMPLETED" | "CANCELLED" = isCompleted ? "COMPLETED" : isCancelled ? "CANCELLED" : dayOffset === 0 ? "DISPATCHED" : "COMPLETED";
      const dispatched = daysAgo(dayOffset);
      const completed = isCompleted ? new Date(dispatched.getTime() + randomBetween(4, 48) * 3600000) : undefined;

      const code = `T-${String(tripCounter).padStart(4, "0")}`;
      tripCounter++;

      tripData.push({
        tripCode: code,
        source: route.source,
        destination: route.destination,
        vehicleId: vehicle.id,
        driverId: driver.id,
        cargoWeightKg: cargo,
        plannedDistanceKm: route.distKm,
        status,
        dispatchedAt: dispatched,
        completedAt: completed,
        finalOdometerKm: isCompleted ? vehicle.odometerKm + route.distKm + randomBetween(-5, 15) : undefined,
        fuelConsumedL: isCompleted ? route.fuelL + randomBetween(-3, 5) : undefined,
        revenue: isCompleted ? revenue : undefined,
        cancelReason: isCancelled ? "Driver unwell — reassigning" : undefined,
      });

      if (isCompleted || dayOffset === 0) {
        fuelData.push({
          vehicleId: vehicle.id,
          date: new Date(dispatched.getTime() + randomBetween(1, 6) * 3600000),
          liters: route.fuelL + randomBetween(-3, 5),
          cost: (route.fuelL + randomBetween(-3, 5)) * 94,
        });
      }

      if (isCompleted) {
        const tollVariation = randomBetween(-50, 100);
        const misc = randomBetween(100, 600);
        expenseData.push({
          vehicleId: vehicle.id,
          toll: route.toll + tollVariation,
          otherMisc: misc,
          total: route.toll + tollVariation + misc,
          status: Math.random() > 0.4 ? "COMPLETED" : "PENDING",
        });
      }
    }

    if (dayOffset % 12 === 0 && dayOffset > 0) {
      const vehicle = activeVehicles[randomBetween(0, activeVehicles.length - 1)];
      maintenanceData.push({
        vehicleId: vehicle.id,
        serviceType: serviceTypes[randomBetween(0, serviceTypes.length - 1)],
        servicerName: garageNames[randomBetween(0, garageNames.length - 1)],
        cost: randomBetween(2500, 55000),
        date: daysAgo(dayOffset),
        status: dayOffset > 5 ? "COMPLETED" : "ACTIVE",
      });
    }
  }

  await prisma.trip.createMany({ data: tripData });

  for (const f of fuelData) {
    await prisma.fuelLog.create({ data: { vehicleId: f.vehicleId, date: f.date, liters: f.liters, cost: f.cost } });
  }

  await prisma.maintenanceLog.createMany({ data: maintenanceData });

  for (const e of expenseData) {
    await prisma.expense.create({ data: { vehicleId: e.vehicleId, toll: e.toll, otherMisc: e.otherMisc, total: e.total, status: e.status } });
  }

  const now = Date.now();
  const hour = 3600000;
  await prisma.vehiclePosition.createMany({
    data: [
      { vehicleId: vehicles[2].id, latitude: 12.9716, longitude: 77.5946, speed: 0, heading: 180, recordedAt: new Date(now - hour * 4) },
      { vehicleId: vehicles[2].id, latitude: 12.9141, longitude: 77.6446, speed: 45, heading: 175, recordedAt: new Date(now - hour * 3.5) },
      { vehicleId: vehicles[2].id, latitude: 12.7846, longitude: 77.7490, speed: 65, heading: 170, recordedAt: new Date(now - hour * 3) },
      { vehicleId: vehicles[2].id, latitude: 12.5200, longitude: 77.8500, speed: 72, heading: 165, recordedAt: new Date(now - hour * 2) },
      { vehicleId: vehicles[2].id, latitude: 12.2900, longitude: 78.0800, speed: 68, heading: 160, recordedAt: new Date(now - hour * 1) },
      { vehicleId: vehicles[2].id, latitude: 12.1200, longitude: 78.2500, speed: 70, heading: 155, recordedAt: new Date() },
      { vehicleId: vehicles[0].id, latitude: 19.0760, longitude: 72.8777, speed: 0, heading: 0, recordedAt: new Date(now - hour * 2) },
      { vehicleId: vehicles[0].id, latitude: 19.1200, longitude: 72.8500, speed: 30, heading: 315, recordedAt: new Date() },
      { vehicleId: vehicles[1].id, latitude: 28.6139, longitude: 77.2090, speed: 0, heading: 0, recordedAt: new Date(now - hour * 24) },
    ],
  });

  console.log(`Seed complete — ${tripData.length} trips, ${fuelData.length} fuel logs, ${maintenanceData.length} maintenance records, ${expenseData.length} expenses across 3 months.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
