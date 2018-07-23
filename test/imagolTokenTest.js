const ImagolToken = artifacts.require("./ImagolStandardToken.sol");

contract('Imagol Token', async (accounts) => {
  const owner = accounts[0]

  const name = 'Imagol'
  const symbol = 'IMA'
  const decimals = 18
  const totalSupplyWei = '10000000000000000000000000000'

  describe('Token test', async () => {
    let tokenInstance = null
    beforeEach('setup contract for each test', async () => {
      tokenInstance = await ImagolToken.new(name, symbol, decimals, totalSupplyWei, owner, {from: owner, gas: 4000000})
    })

    it('Naming test', async () => {
      await assertNameEquals(name, tokenInstance)
      await assertSymbolEquals(symbol, tokenInstance)
      await assertDecimalsEquals(decimals, tokenInstance)
    })

    it('Total supply test', async () => {
      await assertTotalSupplyEquals(totalSupplyWei, tokenInstance)
    })

    it('Created tokens test', async () => {
      await assertTokenBalanceEquals(owner, totalSupplyWei, tokenInstance)
    })
  })
})

const assertDecimalsEquals = async (decimalsShouldBe, instance) => {
  const actualDecimals = await instance.decimals()
  assert.equal(decimalsShouldBe, actualDecimals.toString())
}

const assertSymbolEquals = async (symbolShouldBe, instance) => {
  const actualSymbol = await instance.symbol()
  assert.equal(symbolShouldBe, actualSymbol)
}

const assertNameEquals = async (nameShouldBe, instance) => {
  const actualName = await instance.name()
  assert.equal(nameShouldBe, actualName)
}

const assertTokenBalanceEquals = async (user, balanceShouldBe, instance) => {
  const actualBalance = await instance.balanceOf.call(user, {from: user})
  assert.equal(actualBalance.toPrecision(), balanceShouldBe)
}

const assertTotalSupplyEquals = async (totalSupplyShouldBe, instance) => {
  const actualTotalSupply = await instance.totalSupply()
  assert.equal(actualTotalSupply.toPrecision(), totalSupplyShouldBe)
}
