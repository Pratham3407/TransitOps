import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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

  // ─── Users ────────────────────────────────────────────
  await prisma.user.createMany({
    data: [
      { name: "Rajesh Kumar", email: "admin@transitops.com", passwordHash: password, role: "SUPER_ADMIN" },
      { name: "Amit Sharma", email: "fleetmanager@transitops.com", passwordHash: password, role: "FLEET_MANAGER" },
      { name: "Priya Verma", email: "dispatcher@transitops.com", passwordHash: password, role: "DISPATCHER" },
      { name: "Suresh Nair", email: "safety@transitops.com", passwordHash: password, role: "SAFETY_OFFICER" },
      { name: "Ananya Gupta", email: "finance@transitops.com", passwordHash: password, role: "FINANCIAL_ANALYST" },
    ],
  });

  // ─── Settings ─────────────────────────────────────────
  await prisma.settings.create({
    data: {
      depotName: "Mumbai Central Depot",
      currency: "INR",
      distanceUnit: "km",
      rolePermissions: JSON.stringify({
        FLEET_MANAGER: { fleet: "edit", drivers: "view", trips: "view", fuelExpenses: "view", analytics: "edit" },
        DISPATCHER: { fleet: "view", drivers: "view", trips: "edit", fuelExpenses: "-", analytics: "-" },
        SAFETY_OFFICER: { fleet: "view", drivers: "edit", trips: "view", fuelExpenses: "-", analytics: "-" },
        FINANCIAL_ANALYST: { fleet: "view", drivers: "-", trips: "view", fuelExpenses: "edit", analytics: "edit" },
      }),
    },
  });

  // ─── Vehicles ─────────────────────────────────────────
  // Indian registration format: XX ## XX ####
  const tataAce = await prisma.vehicle.create({
    data: {
      registrationNumber: "MH 01 AB 1234",
      nameModel: "Tata Ace Gold",
      type: "MINI",
      maxLoadCapacityKg: 750,
      odometerKm: 34500,
      acquisitionCost: 585000,
      region: "West — Mumbai",
      latitude: 19.0760,
      longitude: 72.8777,
      status: "AVAILABLE",
    },
  });

  const eicherPro = await prisma.vehicle.create({
    data: {
      registrationNumber: "DL 03 CD 5678",
      nameModel: "Eicher Pro 2049",
      type: "TRUCK",
      maxLoadCapacityKg: 5000,
      odometerKm: 67800,
      acquisitionCost: 1650000,
      region: "North — Delhi",
      latitude: 28.6139,
      longitude: 77.2090,
      status: "AVAILABLE",
    },
  });

  const boleroPickup = await prisma.vehicle.create({
    data: {
      registrationNumber: "KA 01 EF 9012",
      nameModel: "Mahindra Bolero Pikup",
      type: "VAN",
      maxLoadCapacityKg: 1000,
      odometerKm: 52300,
      acquisitionCost: 850000,
      region: "South — Bangalore",
      latitude: 12.9716,
      longitude: 77.5946,
      status: "ON_TRIP",
    },
  });

  const ashokLeyland = await prisma.vehicle.create({
    data: {
      registrationNumber: "TN 02 GH 3456",
      nameModel: "Ashok Leyland Dost+",
      type: "VAN",
      maxLoadCapacityKg: 1200,
      odometerKm: 41200,
      acquisitionCost: 720000,
      region: "South — Chennai",
      latitude: 13.0827,
      longitude: 80.2707,
      status: "IN_SHOP",
    },
  });

  const bharatBenz = await prisma.vehicle.create({
    data: {
      registrationNumber: "GJ 01 IJ 7890",
      nameModel: "BharatBenz 1617",
      type: "TRUCK",
      maxLoadCapacityKg: 16000,
      odometerKm: 112400,
      acquisitionCost: 2200000,
      region: "West — Ahmedabad",
      latitude: 23.0225,
      longitude: 72.5714,
      status: "AVAILABLE",
    },
  });

  const forceTraveller = await prisma.vehicle.create({
    data: {
      registrationNumber: "UP 14 KL 2345",
      nameModel: "Force Traveller 3350",
      type: "VAN",
      maxLoadCapacityKg: 2000,
      odometerKm: 28900,
      acquisitionCost: 1150000,
      region: "North — Lucknow",
      latitude: 26.8467,
      longitude: 80.9462,
      status: "AVAILABLE",
    },
  });

  const tataSigna = await prisma.vehicle.create({
    data: {
      registrationNumber: "RJ 14 MN 6789",
      nameModel: "Tata Signa 4825",
      type: "TRUCK",
      maxLoadCapacityKg: 25000,
      odometerKm: 189000,
      acquisitionCost: 3500000,
      region: "West — Jaipur",
      latitude: 26.9124,
      longitude: 75.7873,
      status: "RETIRED",
    },
  });

  const marutiEeco = await prisma.vehicle.create({
    data: {
      registrationNumber: "AP 09 OP 1122",
      nameModel: "Maruti Eeco Cargo",
      type: "MINI",
      maxLoadCapacityKg: 600,
      odometerKm: 15600,
      acquisitionCost: 495000,
      region: "South — Hyderabad",
      latitude: 17.3850,
      longitude: 78.4867,
      status: "AVAILABLE",
    },
  });

  // ─── Drivers ──────────────────────────────────────────
  const arjun = await prisma.driver.create({
    data: {
      name: "Arjun Singh",
      licenseNumber: "DL-20190012345",
      licenseCategory: "HMV",
      licenseExpiryDate: new Date("2029-03-15"),
      contactNumber: "+91-9876543210",
      safetyScore: 96,
      status: "AVAILABLE",
    },
  });

  const meena = await prisma.driver.create({
    data: {
      name: "Meena Devi",
      licenseNumber: "MH-20200054321",
      licenseCategory: "LMV",
      licenseExpiryDate: new Date("2028-07-20"),
      contactNumber: "+91-9812345678",
      safetyScore: 92,
      status: "AVAILABLE",
    },
  });

  const ravi = await prisma.driver.create({
    data: {
      name: "Ravi Shankar",
      licenseNumber: "KA-20180098765",
      licenseCategory: "HMV",
      licenseExpiryDate: new Date("2025-11-30"),
      contactNumber: "+91-9900112233",
      safetyScore: 87,
      status: "ON_TRIP",
    },
  });

  const fatima = await prisma.driver.create({
    data: {
      name: "Fatima Begum",
      licenseNumber: "TN-20210034567",
      licenseCategory: "LMV",
      licenseExpiryDate: new Date("2026-06-10"),
      contactNumber: "+91-9444556677",
      safetyScore: 94,
      status: "AVAILABLE",
    },
  });

  const suresh = await prisma.driver.create({
    data: {
      name: "Suresh Patel",
      licenseNumber: "GJ-20200076543",
      licenseCategory: "HMV",
      licenseExpiryDate: new Date("2025-09-01"),
      contactNumber: "+91-9777889900",
      safetyScore: 78,
      status: "SUSPENDED",
    },
  });

  const kavita = await prisma.driver.create({
    data: {
      name: "Kavita Joshi",
      licenseNumber: "UP-20220011223",
      licenseCategory: "LMV",
      licenseExpiryDate: new Date("2030-01-25"),
      contactNumber: "+91-9666778899",
      safetyScore: 98,
      status: "AVAILABLE",
    },
  });

  const mohammed = await prisma.driver.create({
    data: {
      name: "Mohammed Ali",
      licenseNumber: "RJ-20190044556",
      licenseCategory: "HMV",
      licenseExpiryDate: new Date("2025-12-20"),
      contactNumber: "+91-9555667788",
      safetyScore: 85,
      status: "OFF_DUTY",
    },
  });

  // ─── Trips ────────────────────────────────────────────
  // Indian routes with realistic distances
  const trip1 = await prisma.trip.create({
    data: {
      tripCode: "MUM-DEL-001",
      source: "Mumbai Central Depot",
      destination: "Delhi NCR Warehouse",
      vehicleId: eicherPro.id,
      driverId: arjun.id,
      cargoWeightKg: 4200,
      plannedDistanceKm: 1400,
      status: "COMPLETED",
      dispatchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      finalOdometerKm: 67800,
      fuelConsumedL: 180,
      revenue: 42000,
    },
  });

  const trip2 = await prisma.trip.create({
    data: {
      tripCode: "BLR-CHN-002",
      source: "Bangalore Silk Board",
      destination: "Chennai Ambattur Industrial",
      vehicleId: boleroPickup.id,
      driverId: ravi.id,
      cargoWeightKg: 800,
      plannedDistanceKm: 350,
      status: "DISPATCHED",
      dispatchedAt: new Date(),
    },
  });
  await prisma.vehicle.update({ where: { id: boleroPickup.id }, data: { status: "ON_TRIP" } });
  await prisma.driver.update({ where: { id: ravi.id }, data: { status: "ON_TRIP" } });

  const trip3 = await prisma.trip.create({
    data: {
      tripCode: "MUM-PUN-003",
      source: "Mumbai Central Depot",
      destination: "Pune Bhosari Industrial Area",
      vehicleId: tataAce.id,
      driverId: meena.id,
      cargoWeightKg: 500,
      plannedDistanceKm: 150,
      status: "DRAFT",
    },
  });

  const trip4 = await prisma.trip.create({
    data: {
      tripCode: "AMD-JAI-004",
      source: "Ahmedabad Naroda",
      destination: "Jaipur Sitapura Industrial",
      vehicleId: bharatBenz.id,
      driverId: mohammed.id,
      cargoWeightKg: 12000,
      plannedDistanceKm: 670,
      status: "CANCELLED",
      cancelReason: "Driver unwell — reassigning",
    },
  });

  const trip5 = await prisma.trip.create({
    data: {
      tripCode: "HYD-BLR-005",
      source: "Hyderabad Miyapur",
      destination: "Bangalore Peenya Industrial",
      vehicleId: marutiEeco.id,
      driverId: fatima.id,
      cargoWeightKg: 400,
      plannedDistanceKm: 570,
      status: "COMPLETED",
      dispatchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
      finalOdometerKm: 15600,
      fuelConsumedL: 42,
      revenue: 18000,
    },
  });

  // ─── Fuel Logs (Indian diesel prices ~₹92-96/L) ──────
  await prisma.fuelLog.createMany({
    data: [
      { vehicleId: eicherPro.id, tripId: trip1.id, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), liters: 180, cost: 16920 },
      { vehicleId: tataAce.id, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), liters: 35, cost: 3290 },
      { vehicleId: boleroPickup.id, tripId: trip2.id, date: new Date(Date.now() - 1000 * 60 * 60 * 2), liters: 45, cost: 4230 },
      { vehicleId: marutiEeco.id, tripId: trip5.id, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), liters: 42, cost: 3948 },
      { vehicleId: forceTraveller.id, date: new Date(Date.now() - 1000 * 60 * 60 * 24), liters: 60, cost: 5640 },
    ],
  });

  // ─── Maintenance (Indian garages) ─────────────────────
  await prisma.maintenanceLog.createMany({
    data: [
      {
        vehicleId: ashokLeyland.id,
        serviceType: "Engine Overhaul",
        servicerName: "Chennai Auto Works, Ambattur",
        cost: 45000,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24),
        status: "ACTIVE",
      },
      {
        vehicleId: eicherPro.id,
        serviceType: "Brake Pad Replacement",
        servicerName: "Delhi Truck Service Center, Wazirabad",
        cost: 8500,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
        status: "COMPLETED",
      },
      {
        vehicleId: tataSigna.id,
        serviceType: "Clutch Plate Change",
        servicerName: "Jaipur Heavy Vehicles Garage",
        cost: 12000,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        status: "COMPLETED",
      },
      {
        vehicleId: tataAce.id,
        serviceType: "Oil Change & Filter",
        servicerName: "Mumbai Tata Service, Andheri",
        cost: 3500,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        status: "COMPLETED",
      },
      {
        vehicleId: bharatBenz.id,
        serviceType: "Tyre Replacement (6 tyres)",
        servicerName: "Ahmedabad BharatBenz Dealer",
        cost: 54000,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
        status: "COMPLETED",
      },
    ],
  });

  // ─── Expenses (Indian tolls, GST) ─────────────────────
  await prisma.expense.createMany({
    data: [
      { vehicleId: eicherPro.id, tripId: trip1.id, toll: 2350, otherMisc: 500, total: 2850, status: "COMPLETED" },
      { vehicleId: boleroPickup.id, tripId: trip2.id, toll: 485, otherMisc: 150, total: 635, status: "PENDING" },
      { vehicleId: marutiEeco.id, tripId: trip5.id, toll: 320, otherMisc: 200, total: 520, status: "COMPLETED" },
      { vehicleId: bharatBenz.id, tripId: trip4.id, toll: 1100, otherMisc: 300, total: 1400, status: "PENDING" },
    ],
  });

  // ─── Vehicle Positions (GPS pings) ────────────────────
  // Simulated trip: boleroPickup moving Bangalore → Chennai on NH44
  const now = Date.now();
  const hour = 1000 * 60 * 60;
  await prisma.vehiclePosition.createMany({
    data: [
      // Bolero on Bangalore → Chennai route
      { vehicleId: boleroPickup.id, latitude: 12.9716, longitude: 77.5946, speed: 0, heading: 180, recordedAt: new Date(now - hour * 4) },
      { vehicleId: boleroPickup.id, latitude: 12.9141, longitude: 77.6446, speed: 45, heading: 175, recordedAt: new Date(now - hour * 3.5) },
      { vehicleId: boleroPickup.id, latitude: 12.7846, longitude: 77.7490, speed: 65, heading: 170, recordedAt: new Date(now - hour * 3) },
      { vehicleId: boleroPickup.id, latitude: 12.5200, longitude: 77.8500, speed: 72, heading: 165, recordedAt: new Date(now - hour * 2) },
      { vehicleId: boleroPickup.id, latitude: 12.2900, longitude: 78.0800, speed: 68, heading: 160, recordedAt: new Date(now - hour * 1) },
      { vehicleId: boleroPickup.id, latitude: 12.1200, longitude: 78.2500, speed: 70, heading: 155, recordedAt: new Date() },
      // Tata Ace in Mumbai
      { vehicleId: tataAce.id, latitude: 19.0760, longitude: 72.8777, speed: 0, heading: 0, recordedAt: new Date(now - hour * 2) },
      { vehicleId: tataAce.id, latitude: 19.1200, longitude: 72.8500, speed: 30, heading: 315, recordedAt: new Date() },
      // Eicher parked in Delhi after trip
      { vehicleId: eicherPro.id, latitude: 28.6139, longitude: 77.2090, speed: 0, heading: 0, recordedAt: new Date(now - hour * 24) },
    ],
  });

  console.log("Seed complete — all Indian data loaded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
