
// --- While Loops ---

let instanceCount = 0;
const targetCount = 5;

while (instanceCount < targetCount) {
    console.log("Launching EC2 instance #" + (instanceCount + 1));
    instanceCount++;
}