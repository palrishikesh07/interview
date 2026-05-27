const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './order.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const grpcObject  = grpc.loadPackageDefinition(packageDef);
const orderPackage = grpcObject.food;

const client = new orderPackage.OrderService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

// 1. Place an order
client.PlaceOrder({item:"Pizza", quantity: 2}, (err, response) => {
    if (err) {
        console.error("Error placing order:", err);
    } else {
        console.log("Order placed:", response);
    }
});

// 2. Get order status

setTimeout(() => {
    console.log("Started delivery tracking after 10s....");
    const stream = client.TrackDelivery({orderId:"1234"});

    stream.on("data",(location)=>{
        console.log(`Current location: ${location.latitude}, ${location.longitude}`);
    })

    stream.on("error",(err)=>{
        console.error("Error tracking delivery:", err);
    })

    stream.on("end",()=>{
        console.log("Delivery tracking ended.");
    })  
    
},10000)