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

const server = new grpc.Server();

server.addService(orderPackage.OrderService.service, {
    // Unary RPC for placing an order
    PlaceOrder: (call, callback) => {
        const {item, quantity} = call.request;
        console.log(`Received order for ${quantity} ${item}(s)`);
        callback(null, {orderId: "1234", status: "Order placed successfully"});
    },

    // Server streaming RPC for tracking delivery
    TrackDelivery:(call)=>{
        const { orderId } = call.request;
        console.log(`Tracking delivery for order ID: ${orderId}`);

        // Simulate delivery tracking with periodic location updates
        let count = 0;
        const intervalId = setInterval(() => {
            if (count < 11) {
                call.write({latitude: 40.7128 + Math.random() * 0.01, longitude: -74.0060 + Math.random() * 0.01});
                count++;
            } else {
                clearInterval(intervalId);
                call.end();
            }
        }, 2000);
    }
});

server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Error binding server:', err);
    } else {
        console.log(`Server running on port ${port}`);
        // server.start();
    }
}); 