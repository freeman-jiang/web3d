const hre = require("hardhat");
const { initialize } = require("zokrates-js");
const THREE =  require('three');
const {GLTFLoader} = require('./GTLFLoader');
const OSM_Data = require('./data/osm.json')


async function main() { 
    // Conversion factors
    const VERIFICATION_CONTRACT = "0x6dBbf53c2a48bd4090f9986c7319Ec1664Ac32a2"
    const floatToUintScalingFactor = 10 ** 21;
    const uintToLatLongRatio = 0.0000000281531532;
    const mToLatLongRatio = 0.00001 / 1.1;

    // 3D Data extracted from file
    const dataAddress = "0x4a794689d2B713efE90dc78cc26c30d94fF17A7C"
    const extractedSize = "16000.001953125 5291.733886718754 16000.0048828125"
        .split(" ").map((x) => x * uintToLatLongRatio)
    const inner = {}
    inner.w = extractedSize[0]
    inner.d = extractedSize[1]
    inner.h = extractedSize[2]

    // Decode OSM Data
    const box = new THREE.Box2()
    for(let i = 0; i < OSM_Data.cood.length; i++){
        box.expandByPoint(new THREE.Vector2(OSM_Data.cood[i][0], OSM_Data.cood[i][1]))
    }
    const outer = {}
    outer.w = box.max.x - box.min.x
    outer.d = box.max.y - box.min.y
    outer.h = OSM_Data.height * mToLatLongRatio


    // Verify data
    const Verifier = await ethers.getContractFactory('Verifier');
    const verifier = await Verifier.attach(VERIFICATION_CONTRACT) // deployed address here

    const zokratesProvider = await initialize() 
    const source = `
            def main(private field[3] inner_edge_lengths, field[3] outer_edge_lengths) {
            assert(inner_edge_lengths[0] < outer_edge_lengths[0]);
            assert(inner_edge_lengths[1] < outer_edge_lengths[1]);
            assert(inner_edge_lengths[2] < outer_edge_lengths[2]);
            return;
        }`;

    const artifacts = zokratesProvider.compile(source);

    // computation
    const { witness, output } = zokratesProvider.computeWitness(artifacts, [
        Object.values(inner).map((x) => Math.floor(x * floatToUintScalingFactor).toString()),
        Object.values(outer).map((x) => Math.floor(x * floatToUintScalingFactor).toString()),
    ]);

    // run setup
    const keypair = zokratesProvider.setup(artifacts.program);

    // generate proof
    const proof = zokratesProvider.generateProof(
        artifacts.program,
        witness,
        keypair.pk
    );

    const isVerified = zokratesProvider.verify(keypair.vk, proof);

    console.log("Verify locally:", isVerified)
    console.log("Verification tx: ", (await verifier.verifyTx(proof.proof, proof.inputs, dataAddress)).hash)
    console.log("Check that data is verified on-chain: ", await verifier.verified(dataAddress));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
