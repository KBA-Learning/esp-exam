const {
  loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers')
const { expect } = require('chai')

describe('Storage', function () {
  async function deployStorageFixture() {
    const Storage = await ethers.getContractFactory('Storage')
    const storage = await Storage.deploy()

    return { storage }
  }

  it('Should store the data', async function () {
    const { storage } = await loadFixture(deployStorageFixture)

    const tx = await storage.store('Hello, World!')

    expect(tx.blockNumber).to.equal(2)
    expect(tx.nonce).to.equal(1)
    expect(tx.value).to.equal(0)
  })

  it('Should retrieve empty data', async function () {
    const { storage } = await loadFixture(deployStorageFixture)

    const data = await storage.retrieve()

    expect(data).to.be.empty
  })

  it('Should retrieve the data', async function () {
    const { storage } = await loadFixture(deployStorageFixture)

    await storage.store('Hello, World!')
    const data = await storage.retrieve()

    expect(data).to.equal('Hello, World!')
  })
})
