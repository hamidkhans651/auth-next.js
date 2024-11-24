npm install nodemailer


<!-- for hashing -->
npm i bcryptjs




npm install mongodb


for neon database
npm install @neondatabase/serverless



npm i dotenv
npm i @neondatabase/serverless
npm i drizzle-orm
npm i -D drizzle-kit






for manually check db
npx drizzle-kit introspect --url=postgresql://username:password@ep-mute-feather-a54bejfi.us-east-2.aws.neon.tech/neondb?sslmode=require --dialect=postgresql


npm install @types/jsonwebtoken --save-dev


    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6e7e00d007b771",
        pass: "a82b3e59acf26a",
      },
    });