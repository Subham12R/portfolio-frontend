/**
 * Neko.js - Bundled version (In-house)
 * Copyright (C) 2025 Louis Abraham
 *
 * Based on Neko98 by David Harvey (1998)
 * Original Neko by Masayuki Koba
 *
 * Licensed under GPL v3 (see LICENSE.md)
 *
 * NOTE: To customize sprites, replace the `NEKO_SPRITES` array below
 * or call `neko.setSprites(yourCustomSprites)` after initialization.
 */

(function() {
    "use strict";

    // Embedded sprite data (base64-encoded)
    const NEKO_SPRITES = [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABIklEQVR4nO1WSQ7EMAiDUf//ZeYwoguYLdVIPdSnqklsB0gI0QsMeQJntKAiQuPLG7ILRUQkIUTjqfinMMCI4KcBzUUcpYFsV0oQCTgEBi9TdFwNMB27bakYka455Vc9l4LISCYAB6xBK6zYAtI0b0akg5CvKkLMxpgv+p9hIx/COUsfTmv7s6CF01pKQZT7QU3siIoQ4pxjFWPmy/fUzCT87YvoZKbkn6SAu1XeFW9PMtjDcI6IMWd5BfwjorUidLdZMSZZb1g6BQTqYdghbxkISaMGldXEtAZaJwEczVu9oN2ikZEKlQERkfSBkTWmam1l4BJudNtlhsDa+6dg+CRrIe0FaDdTVBGLIiAqnIkreSZiOBxZtHKyZfh0L+a/eA6+YR662bT+YjsAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA40lEQVR4nO1XyxLDIAiUTv7/l+mhsfUBsogZM233ZkZ2F2SIUpoHN2uaIUGDWrHEXH8iEqlMfq9rboU7wpcRmPeBCpfiUrb527mHk1C1iIGu5Kv2wgauAnJW5rmr5EA/QAYERyNBl8b2CiA9QG1m1hoVhzacqEogVeTqQcSasEj6MRM2oCqCo9jUGUVVWRORqwLC1BS1hk04I57jmtGsYvskNA14s88oqxAyMDuE0NiRgW4AzcAaSPfvgZ83EOqDVfeBlDb+C0Qj74V+SYV5D6eBknjJw+T2Tfj9BqKAX0B/aHgCdIBeOO78F8UAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABDklEQVR4nO1Wyw4DIQiEpv//y/TQuEVXmBG3ySbtnFQQRuWhSh02zLViBG0anXwE1otUU1Oh8JE5907a2MxOzsf1yb7wIBmBzpiqduMRbc3MujECJDASuVqXJvAtQAL+6huiGBjnIDBFROQJNeT85tEVMw5LBNg3XUxNESGzYDSE5m2NIQ4L0YzAzPCMhNsb+qGfAJ3Iy9jT0wQ8iZnD5jSSXUIAGV5x6oGCUCup5TaLgDijK6GqUmnF6h36hM67nSWRD7Ji/wYiB60FRynIABGwanA5EqmB+3fDP4HbEph9WCtYKsUe7CcFYbcUqySF5tJSDAyXe8YygeRUJRJLBIgr3eqeGUxASd3U/2G8AFt7mTLOfRenAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABF0lEQVR4nO2W3Q6DMAiFYdn7vzK70E5KDpTS6s1GYqJt5XzlR8tUM1H3XPSx9LKIHAzMKRfuomUABKHn1DzUehUBoKCIkIh8gZhZwwl6970DAAExM4EoCR2RaBO8JQIRhH5utycEE21KQQQBrKuFbQCO2NBmAERd2fYb2sjLlTiwQ1tooZDTilEXyMh5NezavAgMxdMCV6qgFhrcLR6m+dY2zJgF2Lb7CsDj4hagZOaH040/AmD/gJbjdoBOrfB17ABWP6+VGrqlDTP9DwGqXbASuQbQKWuHXpXbta0QZ3avAciecpuzKCpaXA9nxRsAOmIzcAzFveesMQBonqC6dy4wPqcAtFj6gIJgZvM/vTiC2eTzbz9oHxxQekFCimcpAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABKUlEQVR4nOWX3Q7CMAiFD2bv/8p4sdGxFljpT7zwJMaoG+cDCpnAv4sWxOAZj1kABgBmBtEZivnJc33v+mQAmkxrs8q0XBNBpAAsQy9zB6jx+yQASGdWkYGIysu7H2cVH6RHAiCUVCAAEIiHMhW44sddi1qBuwKlElmAtBRwmRgNmQVgPXISsPNGs02ZM2BOgScPsp4Iq6HaRX5vzImoO3vPHHBaoMrFlrlcIwHr917z5sMd++5VNsvAPLUJl0BEG1BkHcL5lBFnreWeAb3j35bPqDnwrEBZFBbQDnN9YWrGV5kDiU2YbcNSgFXjOASw0xw4D6G5ZrMa6b8AvAXalz6qFoxmMXofMPBI5rRneEQKQE8WM5l6+uwK3KvjV8ai7Q+lq9T8oVilL9sKg2SESmbvAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABGElEQVR4nO2W3Q6DMAiFwfj+r8xupBLKb+vijSfZkilwPmmlA/j0snAhhzbzlwEIAIDo9kcc6csglcTJeCqyAZIlUGTsgLQgjk5wpgu2TpwAtJ6+AUHyvgewZF7QVNcC2DY3ukBeXQ0wgsTOdlWIGcaq7kiUABNhZkBEZgwiAptm3WQAMgbM8nDpLOG0B7rmXheieFBvgV53vGOffRMYVEIc6ubfzD0dhvl1qdZW3nD6Gn8qAAj2mpchLCC5rKr1UrR8GMmiVheqsCkAm0hTQbdlDgB4dhP1vKh0yDMfX77X/eRWF4Li4yfYJ+MISjtgbcTIWAwmTgyXOeyAiqFo6nmHTab2n1Ijz5ukjwNICDSurdT79Ol9/QD98LQSLfZm6wAAAABJRU5ErJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABBklEQVR4nO1V0Q6EMAiDi///y9yLLHUC66Ymd4lNTNQArQWcyIsfgMH1NM8JHxERMxMzS4OeIm8C2OBV8v3jUgGqqh55txMluQsQFOFCbhAxJEcBd4qwgvz0UqMgTAZRUWyZG2Gv12pFQ9hXRDeqdS2Zcc4wdhsJQCFQzB80i2HRO0ANTrAtVB4jYAozg4oCMY9uAVMYgRtVxV0WkIFtyaUWrAJXEX1aHiSS8PDKb6ZboKq0vcxPbJN9Gsk/2NKul3WlsD44G+YJBi4cBGSrwwrJXKpENAGYXAzN0AbPj4T2B1ET0CdHSglEdTI3QkvCA2YRp7YGR/zyl9IinK97fpr3xYs/wxfuy7Lj/kO2hgAAAABJRU5ErJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABHElEQVR4nO2WwRLDIAhEof//z9tLSJUAATTTQ7uHzKSi+6JIIfrry+JCLDat4060DGQcgO3PPHmXQUKDY/Ezhj7BU4y8q/gSQGig40bDFfNoAgyICc4wfw6gCNI+gluA1IJFiFfLJdABLvSg+PruB5hZXO8T7DEAZT7tyDjmAbAqMGmNSalAAECDhTtQgmDmi7kBcdHdEaQgxDh7c8abkskBlq9bkQeXTUKmhbyIVL0FJkS3aHUATMkRabi7dyJCB+CyC5KAACq5AiLi5R2wYLJTz0dTZl+Qci5ew2AdFhIzBwzTa14sAIjc5kXgjLF+B5OBsEAERvcLu/4NvSLFYiaAql94tB+YQLz82AnQKtX7i/vcgun14fz+w3oDTA6XRee9YIQAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABDklEQVR4nO2WSxLDIAxDUaf3v7K7aEKJI/8I7abRMjHWsw0Mrf27kIiRYvwSgG4q8vEHDuFLYFgSGU3pIlDvKaCwA6cfBtwGVYaIFtBRmMkmILxgyRpfgXBHUDVXEMxD9LeHleSqOVlPN7cJ4CWPlDUvA4iICwGgZF4G8CCYuYiEoywDMBmVp2QBIDvvq1rSASZdgDodvV1fA8jqWV2g571X5px/SzIFcMpiGLIToYTWfjgCa1N7AKeTYLU/o9mbMH0coxtS7ZUenHoT6qr321BXFcCivTfeISizCQEgfKYNtCzBCHHQ1Cmwqnc6Yramct/2Loxmuu3qe5i/BLAbkFm7r55VAGPymbW3blG9AHEphjo0CJF9AAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA80lEQVR4nO2WwRLDIAhEoZP//2V6qHZMdHGRNL24M7kosi+IjiI5WfmW9cqYm5mYWQV5HOAWbYC/AxzBeK/Z2jllE9KBUrqeSqpK52a3gDYvwSLk0WQAQuZRiBnAknkEInwKyv7S8zOIEICqiplBiNl8FACWf2RSzVG8gCrQFfAMGECk5ZuwNYnALQF4BuhP2SpEr+LOJCtUgXxmMi8C+FzmgePkqcnTJYQVqM+tEYR3D4zGvKeb24Q/qEAnCFAXZRutrkcQXg98V1y3ooXyxi/wp5zt4EynLExFBn8LfUIvom4AVCKSP9Nlo1Lc07VbW0/qDae6gB08t42YAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA+0lEQVR4nO1Wyw7EIAiEzf7/L7MXadTKY6gemuwkPRSFGVFBojykfZHNs9/wyZKLXPGktzV7TyZtcLY/EqCMW+fBAk4gI6BPf5RaZG5aQBaCpF7xLTK5/whecQb+ApiZS8Gbn+sMZyASg4qF6gAzk4iYJPP4sTqwEqHkKNICEAIvS2UBHkl19UTBCVUuJbw5d6sMxk2eUin2SFFYW5B+0QBYxrQyoCnbJULI2IboEC6dvDqAxMkIOI5UL3jI4fpng7tXsXoFiYAtsKobImoFqA7MInqSqChtEdAHZ+ZbRiqFCTlgQ1s2fDNzBrziGg7Y/SJCkekRJ/rIOfwAzH6TFVfg/LAAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABA0lEQVR4nO2XzRKDMAiEwfH9X5kebDQSfhOcHurepDPuR8DVAvy78KH7UtSjEuA0Jbr8EW8Wg98KAA0FGkp3swPGJoqaa2as4+Fnt7BiroCU7kDIPAPCiyTUxeWqgth44WtCQs2bryoLfADwIDxlIUUAC8IyQMT0mFSAZshvqEHMmLsAFtjsPpQAZCUloARA2rZXdesB/EQbHJse3h5EPE+kP5nZvdjhmo2aeP31bBpqEkfw5MxDAJkuvTFYTwAHwH62XuIl4NKvY7d9fkItBXkaRgB2B2p4/1d2D+DnAHJDac4r0RwJohuEtScsSUNEGWzza6kBRL8FZwA8hf+MvHrV6wMLunpMS0n3sAAAAABJRU5ErJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABHUlEQVR4nO2WyxbDIAhEh578/y/TRWpKEFCRnm4yS19zeWgCPPqzaHM/756dBbiMmW0GIpLnW4sIAI6MeTP9mGjTm4Fcr9YyAEpnQEIoILLWeYBbJQggIOcdOAAFJWBmMLNrPNJqBsx6Thk5GXhFZrh3b855oAagzc7BM9prLhv9DEBnJsd/YdwBCIgGAj2n7/2svPp3ABLCirpBrIBE5npiqcPl3c+aA7l3YCiRoWGqygFmopaK3oFQzgdmybwB3E4afOGuJszeCK0DJ/FU90WNl4ke+JZgaqM2r8hCyTXMRg+oJmwRRZG1+leYWxu7j46GmfnJWFH3DnhvvlP/7SaQJbD+dMkyqTLXAGV1TQPMqBrObMJgvNT8EQC8AQ4mj0+E62kZAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABHElEQVR4nO2WwRLDIAhE2U7//5fppVjUFVHTaQ/ZmVwSw74gEEVu/Vi4KI7uxjwFUBER1Y8/UEKmYu8CdMZd4CTIDoBGxgOQoc/jm+YZeQCVupguMX+/M3yxysBs8a6iuN0WuMVa3z7jGkF4AFjlquoIpJOr9ukaBhEWoYGoKjUCELYiA2wh0l1wuAXwIB6i6oLV/l6EAsuiARTzzJ6uqEk52npYHUSXQogkagBAudqg2WyRcVwgntK0BduKkwIM/gUwAGqQaS+fhV1II9uadC2EiWRx+jekLWJBRs/M3A+sVbWRWQT4+8yE1YufE9GZoO0CkKu8bF/MUj4DG2l16kwHlquJUl+R19GRjKR2+XR8dCglMcKvvXXrL/UCkH+5C6s6Dz0AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABAklEQVR4nO2V2xKDMAhE2U7//5fpi1iCXBJL60zHfdKY5CwkINGti4VgnJNvHWJ5eMxM6oYzMzFzbmCb0G2CBSzKMtBtYoADICJCaqDRhAsn8jNwgCkTZ4yE8OHBm+zJbpCBtw3TtU8PDoAKI1GZ7ouqQDwDU2JmieQAnoVqlZcwMkHvaIe6Xlg3GBjOfiGS8s5UCo/AptmCPgWXBroAleQI4Fysn+jQB4aXL2VB94Mq7CVDE/1j3cBqFuQoJztqauB0c9GAbA8AYRW48Cq6qHSzknb7uQeQ8y2qZepS673Kv6GO2sDP1C3brMD7aMHqvaNZCMTdUIcPM3ZNp7p16+/1AoBksuBmmrTtAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCElEQVR4nO2XwRLDIAhEodP//2V6aDa1gBEUc+h0T5mUuk8UJUzrkuaZs39+Jgb3A+Qdwpz2HgIIBoe0if59Ro+eOQxhyswkIqdphTnRJwMYjfHcGsB8hwCA3N5qTmSXwOykneYeQEiVUKMyDKmpjvSZ0AsyJXhl7sWqku3CLANEdMC4XldpMhWxAyKyTmXZ8CCmqqBStwIcmfxK5+0Z0BAhAO+qbS+qFUUOovOCas2rNmZ6CSpmvQSwOnM9gSgAV888C2A0C6QzmAFg7PxII6qrxImVLADRcYxGIUTE9JV4D5UcRCMIhDkQMt2QRPoAB8yeKRPew++FwLhnFz4F0Hm/p07/+nm9AC/+b1UxIU8OAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABJ0lEQVR4nOWW2xLDIAhEl0z//5fpQ6NFJCAa04cy0+klsnsELwX+PWhgDN+gMZ3MzK0/EZUH9fMKhJfIygQaRkMltMNB7BlKU2vM+WwI4GUZn8mdsq6GNfOMuQUQJnpVmYkCoFVNkMg8O3sAOKS4MGAhuDUqgFxUo2WW44iofE/1qACQhJDiRJSqRBZCK4fbzxT5zr75TejLh43ngTa6Slhm+t0CFpVgr63hSbgaEtDaJeFdcJJsMQf6FnQan9zbtmM3kwiggmQh9OyvqjgKkIaIFmYVTQAInXsWJwDKVCArPhRbAK6u6scAMhCz+2toHWgA67jeVgHpA+c8mQWYPZy6PP2XLCvW9SG7RVdbQPo1UJlmzBNrwIVYacEyBPC7CmyP5sLx4g2TyYdbcQVdwQAAAABJRU5ErJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABH0lEQVR4nOVX0RLCIAwrnv//y/EFbgVaGjp2emdedFLSUCCrIhzgfI7j7fs47uLFBpIAAAEwinLxjgiTYzQKGTclq6u8iIpLtcxBCwAgpZQp8USoYqqoZQ76DBjE03hVuqpGSgAaMYsdEadvwTYYmdhZfUdOnIFIgJnZE5S5CZSAJysQnYHSiPTqxpVaz0xyKkCUB6gfZqJh/KgAL+mS+BJ0xgm7B/4QHqlAzZmqQMhPOWHmFrCv5EhA2oRYEV+34p8UsNXTbcDkHQXoPYfI0t9DqLlur2j2hPrgNVvNGlHYQdn5n9gB2xu8+l77MFSjC3JatMWcfauUfs90POA3n96cCdH/Ao8g2ib65GZ8AEaJ01fllhHdTX4HT5nVH+IDSk+VHrQ/yTUAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABHUlEQVR4nOVWWw7DMAiDqfe/MvvoQ4xAMHlok2ZpmloS7AIhEGGQ66efrd37T/FCyEWERKTkGMUxsTcTc9t5iQDmx88ZChFrt+HvEj/7gDVykzFzQ9wRCglAaqAhVyQNcbVeIAHIl48CjsAulGqg7PxMS5cjE+AyR4K82sh4UgEzuV8RASIVheg4es+of7gGdHi9qFg78vWwgIi06xiMAtStyBRjoQiXRODiHIpA6h++jqtA23EmYOoYIiK+3op/UoCd/1bB9WsF6JwLUbe/p9BTVDQnuCOZbasj84AeULrrfP49w4fXG6L4NheQckDWFr13bPVWSZ850+vFCGBgT4PxCjOpQluvxUwfYOeKLhfPbCPimWO6Erua1x/gDfHvngq4OJEYAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA/ElEQVR4nO2WUQ/DIAiEj2X//y+zF2ksgmCL3UsvWbJM4nfisRbYL24fU5/dcGaXvd1ACAeA7x/hDABUDW70YYHoQBG6TFQaSLW8MwKgLgMpeCvcYiCUPvnjBrSkE48b0J3YNYYuXGfgioEhbcxsbi5QqTFNrYKzaY8kxrIG0mOWBTc2ZwxM4VGLDbDAz1+uwDXAvWcHDszHcKntEsSJSMMjA8tKmBjkjWFJ6FTg0gZuk2d3HhkoG7cILOozcBueabln4AQnojBMuuYKXIoHuLdmmUjsnypg4zfoNe9hYx2gG8mpCbkCgvNH0a9ZJ76dm8X6VVr1W/erV/X6AU6CeC0t3vKrAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCElEQVR4nO2WzRKDMAiE2Y7v/8r0kqSISVzS0F5kxoPK8G34U5F803J17ZUNVx2y0wXcwjMFUHARkWM3uNBpf+yEz8BAQ1nmNgF0youQytXsKfDgWp6m9mcCRvYXATYLqQIA+NRffRbiXiKpqgAYQ5wI04ihKYjO+NCsAHYR0WPWAdkgfgypElAL5k7g6iIKLRjG12cF8mkqLyacdlaE9T8KSQBoR0TIRtPgT21ftT3gVuRS012imz1gOTY2PIxtqhnUP3L3p5K3r9KOEzsBVDlrCTCpUxq853hKQ2T+V+CMM/uXsxqf24RGTVeEb2Kzcm8ZzOcY9eqd+NvmjXZelLbzp/exx3LsDfOJkxZk2B+5AAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA+UlEQVR4nO2VSw6AIAxEKfH+V64bwfIpTPm5cRKNgdB50FKd08XPs1W+NcnMAeQbgBMQXYDdEB4NLCCWgtATkKSXMKwvIgprlwNwy3gHhKyBaP4EPyKoCE8AwEe/CyCRTMXudMgiLGpAOxUicsyswZmIqwAzElAQSPUa5jsbAUOv6VAjEgbTDSsAvO7AbkMNIOpBmHNvMe9AsBysRsyNRswVgFhrXoxUDVf0gex3npz49XpRGC2OamEzKtJtiQzdDlQhLZafEYmFS8zjy6jkJAz9IBkqPhBTdXKiGSEASXuWZtq1zHbc9LhakwCZZg6ndkkKJuL++vW9bhYolBau0DkQAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABA0lEQVR4nO2WSw7DIAxEPVHuf2V30TgyCP8SoJuOVKkthHkG24HIFl+fpTq8QWYWkN8A7IA4KLHVKyHQLXz/vkzbyYCetwRgaGyATIFociBjruZNOZJhEqqtXq6DKB/5MgDRzshFp3yRXdgNga+3XXLWGDNbsKUI3Lp/omqvEIBVICFEP+F2j0C8I6pAjAZDCMmBjCKIUSOC90DFnCjumuHr+I15Rh4AAEzpC94unKM/NQQR8cTmJBXXGFQefn0EfVKWcsDpfqU1SB1HBQCjFpzJk36OhsiGk7kzmuZkdFoAKQDWUfcLBHdHMW/W02NRFURklrkX2KMqqKb+/pvNX3891QdsP4ApjDDinQAAAABJRU5ErJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABBElEQVR4nN2X2wrDQAhEx9L//+XpQ7PB7FVdE2gHCoVtnIOuxgJ/JB4fl15Z5iRBsoA8CsDDOKRdgIu5iACAPAmwZQ4A74DXLN/6zATjJTbX25oRTwlcl83aEVaA0E23QFgAttpsBbECaMyP2g61OvcCNMFJDk1W516AYdp6JsXcG68HQKjZXowMBl3A8py6C5cgNYB+qZzBrCaj3+nv9aWsizVNey1dhtV5RwK0o3j0RBfMWJIpRdrLKKrfBJjNgUcAMnUbgDUbVgAZtdyqFbMAGrOZqWdqelcyEZEzckYmIjsh8B0u7GRE4PxfEAXQhkWhreWWLsjaBzYZ8rdi/5j7BX0ADfCTHKrbEI8AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCklEQVR4nNWX4Q7DIAiEYdn7vzL7MW3QgnLIlvSSJUus3KcopUQPlrTfkV5ZcxEhEekgaTFq3NzHIMyZWCmAC6QKIpsCbobHeoPP7/Ktx0OEyDJu274MHExJNAWQeZtAFLghEQDYHIHYAaTNoxDwLdidfvR2QADMTCLimuzGUQB32yyTbo7GswCEVK3vRgEDE7DPU2dhCDID6JfMFSxq4j2n/8+Hck7Wcttn6TTsxg0x0b0UezNMsGBKlhTZl1GZngmwqgN/AahUGKCqAUkDaOnT713F6n7ArfGJ+z8IaslmCG8n6LvyUJFAe8LBwFhp2PgUQBt2pToXuB+oVhSAsx8eVQAZ/aZwVOsDqwuPItm/Ur4AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCklEQVR4nO2WSw7DMAhEcdX7X9ldJFQO5jfYirLISFmkJcOTwcZEr3D189miT4mg920gJQCGGEDuBxhBViAsgE7AEq+UpNmeh1drl5DGSfj/yfCIt3xxAMXcTF6B8IJUCC2ZAxtCbGlCUSZIywAMwUJhIIDI3CpHFaDJhNpyj+9ocqK4SVKNKEGS3ukg9UyQdVf6YBvABcI0KkIgLTsRJLo/9P8CANKsAjSpeg70lb0/ClkBNfn5QxkARU81I+KdKUFqzhuTMvw2KsF4BqhGzoiW38LbZFpuLVn2/LfOBWgXrDQbW5Aoi1uC7A2IY71blPThsphXMivxmAiZhNawcgGS+l9UgfhXz9EPsSqlDRy22m8AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCUlEQVR4nO2W0a7EIAhEnZv9/1/2vpRdtB0YXLtPnaRJExEPKGhrjx5p6se3XX8yQe+3gMgABrEbpARAQH4P4EHal9mA9xeNHYtxR4DNMUNw64+GDFhqp8ik6PyWVLbn5f4B4B1pFvEuLZ2BI923ACBzDqCSndTwKgMUorK4WqrLZQhA2ooMgnkYJsxRs0wYUDB2Wo8CVKvAoKoQdAssxeZQPfll8MgXc8ii9JBqBpSwTp6iKKNKKW2Bn+e+NMX+HChSAG57DSkAPWsoarTMLgIYStH+lVYdDVcAroiW7FgTam28jk+KmoqiKRtXTsAAaA+4WmAuvawfOLsu3QWJ/DOsqn0Pi0er+gdkMKQLf5051AAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA9klEQVR4nO2VzRLDIAiEs528/yvTS5NRyvKjTHsJx6jwueDmOJ54Yi2kK9FrpbiItEEwgDB5F4QFkL5hBwRtAUl+wbVBuDPwCyXCIRySf92+A+LMbPIK74alAAAsJVtRYcUH7lgFHSPVAla4ozVlAAC08AesJAvbPFUICt7rQUvMRaqAJ2/UAus7ALEg0gpo6dltE+DTQU8zYQnH4pVBrAJMINMH1XOtTGVIqw/ZtGOtCIOwADLP8MpEYXf8IHJCERHXYnfd0AOY5E6+dbrOTKr0L8hKXWmJOwO7nm+ooROBAVAPsAp4JhUYk6ScMAgU9+uzT/w33t2WoP+qWuSTAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA70lEQVR4nO1Wyw7DMAgr0/7/l73LmAglBJNKU6X6VDUBm0dCjuPBDYHN9QEvlhxARrJa3xagLBGJklNgBJQJmCy0MhCQtKJnBGQE4UI1C++igJi5GbVFqwQiQv2/XMCVuKeAWe07PUE1oa2xkonI8M2KYbqGOutfMUv/TAmk2uVV8vImh18abEacuLLfzkWkzqN60AF1j+GpH9gxvCNg2owdEd0HSbaBElERAMYha7sSAABpVMnRXNquBAzpjm67TFBgG4qgeoB8kpWQ3gNRNCxcxrwjmQlAhVid24F0chQMLWOPWUGZkIXc720f/BcfQ6ib3RoDepoAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABBElEQVR4nO2W0Q7DIAhFYdmH98/ZEwkiIhebLE16X5bVyj0iRYlePVByOD7og5qLSGayGz8GUJfIRM0hIQBlAyQLrQwEJq3VIwCZQThQzcK3CEBERMw8GHgoP14RBGCDMjOJyPSLCq4BXaWaejj7rKJyBqyx/r/MmD73YLcBIOlFstH+DO8SsmEyFaEJsvgitvGxigkg6MC8A0BkmksEg8aF+oALHlUlvKBuEU6tGT2GTwCW50IHonshyV6AICoAggRE5+4AxJx6YaCk223n7gCGdFfba9QbMgioBsArWUlpH1h1OkQuYz4QrwCkYqzBs8uI3bqgZctqQ5ElM/i+n/vqv/oBKoa/WI/BrT0AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA1ElEQVR4nO1USQ7EIAxzRvP/L6eXgUlTstDCpYqlqmyJTTAAhUKhUCjsB3uTn93kzOyKWCHASt7IXTwVYO0wRQ4A3wXkvR+tB0B6cLYC3D5J3tr6fwo0vJAV0Emt0jIziC4bPM2NRIwjLvH/GJFoGkJgb+y+hiEiAWk3T6In9QQsJW/l1zmnj0CajYhM40lizzdP3oGeVIqYMCwDcOW7R2Alj8blHwDdvgXWvddVkUcwWh+9A6ERIw9oQaofRP9yeIkjQZJw4JmUgLQoqSOx7i73y3AA4giQ7eL+8PYAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA10lEQVR4nO2UUQ7EIAhEYbP3vzL7wxo6IqKpadIwSWNKlXmClahUKpVKpbMSfYb6nDQXCb1vARg5zJ1vABAYrx919zoOgb6bpi05M4cGsJYxmK2AkPYUdnYZMYawHmhH5JljQmbuTLQSrrldo/Oa7wwgZZ7VH9L6nvwNU3oKoJUwAkhdJBmZ0nftW66AOUjEzO2JzKONrN4DHYw18mKBuRARb50BWwUbw7gHg1Dbh9CDsKbYptH85XugSxD03wOC98lqzRElngFZQ4TJAqShLEdi3q73y/QDzYaO9US4bAEAAAAASUVORK5CYII="
    ];

    // Mascot sprite paths (custom sprites in public/sprites/mascot/)
    const MASCOT_SPRITES = [
        "/sprites/mascot/0.png",   // 0  AWAKE
        "/sprites/mascot/1.png",   // 1  U_MOVE_1
        "/sprites/mascot/2.png",   // 2  U_MOVE_2
        "/sprites/mascot/3.png",   // 3  UR_MOVE_1
        "/sprites/mascot/4.png",   // 4  UR_MOVE_2
        "/sprites/mascot/5.png",   // 5  R_MOVE_1
        "/sprites/mascot/6.png",   // 6  R_MOVE_2
        "/sprites/mascot/7.png",   // 7  DR_MOVE_1
        "/sprites/mascot/8.png",   // 8  DR_MOVE_2
        "/sprites/mascot/9.png",   // 9  D_MOVE_1
        "/sprites/mascot/10.png",  // 10 D_MOVE_2
        "/sprites/mascot/11.png",  // 11 DL_MOVE_1
        "/sprites/mascot/12.png",  // 12 DL_MOVE_2
        "/sprites/mascot/13.png",  // 13 L_MOVE_1
        "/sprites/mascot/14.png",  // 14 L_MOVE_2
        "/sprites/mascot/15.png",  // 15 UL_MOVE_1
        "/sprites/mascot/16.png",  // 16 UL_MOVE_2
        "/sprites/mascot/17.png",  // 17 U_CLAW_1
        "/sprites/mascot/18.png",  // 18 U_CLAW_2
        "/sprites/mascot/19.png",  // 19 R_CLAW_1
        "/sprites/mascot/20.png",  // 20 R_CLAW_2
        "/sprites/mascot/13.png",  // 21 L_CLAW_1   ← reuse L_MOVE_1
        "/sprites/mascot/14.png",  // 22 L_CLAW_2   ← reuse L_MOVE_2
        "/sprites/mascot/17.png",  // 23 D_CLAW_1   ← reuse U_CLAW_1
        "/sprites/mascot/18.png",  // 24 D_CLAW_2   ← reuse U_CLAW_2
        "/sprites/mascot/0.png",   // 25 WASH       ← reuse AWAKE
        "/sprites/mascot/19.png",  // 26 SCRATCH_1  ← reuse R_CLAW_1
        "/sprites/mascot/20.png",  // 27 SCRATCH_2  ← reuse R_CLAW_2
        "/sprites/mascot/20.png",   // 28 STOP       ← reuse AWAKE
        "/sprites/mascot/20.png",   // 29 YAWN       ← reuse AWAKE
        "/sprites/mascot/29.png",   // 30 SLEEP_1    ← reuse D_MOVE_1
        "/sprites/mascot/20.png",  // 31 SLEEP_2    ← reuse D_MOVE_2
    ];

    // Track current sprite mode
    let mascotMode = false;

    // Sprite sizes
    const NEKO_SIZE = 32;
    const MASCOT_SIZE = 64;
    let currentSpriteSize = NEKO_SIZE;

    function updateSpriteSize() {
        const size = mascotMode ? MASCOT_SIZE : NEKO_SIZE;
        currentSpriteSize = size;
        if (window.neko && window.neko.element) {
            window.neko.element.style.width = size + "px";
            window.neko.element.style.height = size + "px";
        }
    }

    // Animation states (matching original Neko.h enum)
    const NekoState = {
        STOP: 0,
        WASH: 1,
        SCRATCH: 2,
        YAWN: 3,
        SLEEP: 4,
        AWAKE: 5,
        U_MOVE: 6,   // Up
        D_MOVE: 7,   // Down
        L_MOVE: 8,   // Left
        R_MOVE: 9,   // Right
        UL_MOVE: 10, // Up-Left
        UR_MOVE: 11, // Up-Right
        DL_MOVE: 12, // Down-Left
        DR_MOVE: 13, // Down-Right
        U_CLAW: 14,  // Clawing upward (at top boundary)
        D_CLAW: 15,  // Clawing downward (at bottom boundary)
        L_CLAW: 16,  // Clawing left (at left boundary)
        R_CLAW: 17,  // Clawing right (at right boundary)
    };

    // Behavior modes (matching original Action enum)
    const BehaviorMode = {
        CHASE_MOUSE: 0,
        RUN_AWAY_FROM_MOUSE: 1,
        RUN_AROUND_RANDOMLY: 2,
        PACE_AROUND_SCREEN: 3,
        RUN_AROUND: 4,
    };

    // Animation timing constants (in frames)
    const STOP_TIME = 4;
    const WASH_TIME = 10;
    const SCRATCH_TIME = 4;
    const YAWN_TIME = 3;
    const AWAKE_TIME = 3;
    const CLAW_TIME = 10;

    class Neko {
        constructor(options = {}) {
            // Configuration
            this.fps = options.fps || 120;
            this.speed = options.speed || 24;
            this.behaviorMode = options.behaviorMode || BehaviorMode.CHASE_MOUSE;
            this.idleThreshold = options.idleThreshold || 6;

            // State
            this.state = NekoState.STOP;
            this.tickCount = 0;
            this.stateCount = 0;

            // Position
            this.x = options.startX || 0;
            this.y = options.startY || 0;
            this.logicX = this.x;
            this.logicY = this.y;
            this.prevLogicX = this.x;
            this.prevLogicY = this.y;
            this.targetX = this.x;
            this.targetY = this.y;
            this.oldTargetX = this.x;
            this.oldTargetY = this.y;
            this.moveDX = 0;
            this.moveDY = 0;

            // Bounds
            this.boundsWidth = document.documentElement.clientWidth - currentSpriteSize;
            this.boundsHeight = window.innerHeight - currentSpriteSize;

            // Mouse tracking
            this.mouseX = null;
            this.mouseY = null;
            this.hasMouseMoved = false;

            // DOM element
            this.element = null;
            this.spriteImages = [];
            this.allowBehaviorChange = options.allowBehaviorChange !== false;

            // Animation lookup table
            this.animationTable = [
                [28, 28], // STOP
                [25, 28], // WASH
                [26, 27], // SCRATCH
                [29, 29], // YAWN
                [30, 31], // SLEEP
                [0, 0],   // AWAKE
                [1, 2],   // U_MOVE
                [9, 10],  // D_MOVE
                [13, 14], // L_MOVE
                [5, 6],   // R_MOVE
                [15, 16], // UL_MOVE
                [3, 4],   // UR_MOVE
                [11, 12], // DL_MOVE
                [7, 8],   // DR_MOVE
                [17, 18], // U_CLAW
                [23, 24], // D_CLAW
                [21, 22], // L_CLAW
                [19, 20], // R_CLAW
            ];

            // Additional state for behaviors
            this.cornerIndex = 0;
            this.ballX = 0;
            this.ballY = 0;
            this.ballVX = 0;
            this.ballVY = 0;

            this.init();
        }

        init() {
            // Create the neko element
            this.element = document.createElement("div");
            this.element.className = "neko";
            this.element.style.cssText = `
                position: fixed;
                width: ${currentSpriteSize}px;
                height: ${currentSpriteSize}px;
                image-rendering: pixelated;
                pointer-events: ${this.allowBehaviorChange ? "auto" : "none"};
                cursor: ${this.allowBehaviorChange ? "pointer" : "default"};
                z-index: 999999;
                left: ${this.x}px;
                top: ${this.y}px;
                margin: 0;
                padding: 0;
                border: none;
                background: transparent;
                overflow: visible;
                box-sizing: border-box;
                user-select: none;
                -webkit-user-select: none;
            `;

            const img = document.createElement("img");
            img.style.cssText = `
                width: 100%;
                height: 100%;
                background: transparent;
                border: none;
                margin: 0;
                padding: 0;
                max-width: none;
                max-height: none;
                display: block;
                box-sizing: border-box;
                user-select: none;
                -webkit-user-select: none;
                -webkit-user-drag: none;
                pointer-events: none;
            `;
            this.element.appendChild(img);
            this.imgElement = img; // Cache for performance

            document.body.appendChild(this.element);

            // Click to cycle through behaviors, double-click to sleep
            if (this.allowBehaviorChange) {
                this._clickTimeout = null;
                this.element.addEventListener("click", (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (this._clickTimeout) {
                        clearTimeout(this._clickTimeout);
                        this._clickTimeout = null;
                        // Double-click: toggle sleep
                        if (this.state === NekoState.SLEEP) {
                            this.setState(NekoState.AWAKE);
                        } else {
                            this.setState(NekoState.SLEEP);
                        }
                    } else {
                        this._clickTimeout = setTimeout(() => {
                            this._clickTimeout = null;
                            this.setState(NekoState.AWAKE);
                            this.cycleBehavior();
                        }, 250);
                    }
                });
            }

            // Track mouse position - use pointermove for better responsiveness
            this._onPointerMove = (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.hasMouseMoved = true;
            };
            document.addEventListener("pointermove", this._onPointerMove, { passive: true });

            // Update bounds on resize - debounced for performance
            this._resizeTimeout = null;
            this._onResize = () => {
                clearTimeout(this._resizeTimeout);
                this._resizeTimeout = setTimeout(() => {
                    this.boundsWidth = document.documentElement.clientWidth - currentSpriteSize;
                    this.boundsHeight = window.innerHeight - currentSpriteSize;
                }, 100);
            };
            window.addEventListener("resize", this._onResize, { passive: true });

            // Random starting position
            this.x = Math.random() * this.boundsWidth;
            this.y = Math.random() * this.boundsHeight;
            this.logicX = this.x;
            this.logicY = this.y;
            this.prevLogicX = this.x;
            this.prevLogicY = this.y;
            this.targetX = this.x + currentSpriteSize / 2;
            this.targetY = this.y + currentSpriteSize - 1;
            this.oldTargetX = this.targetX;
            this.oldTargetY = this.targetY;
            this.updatePosition();

            this.running = false;
            this.intervalId = null;
        }

        start() {
            if (this.running) return;
            this.running = true;
            this.lastFrameTime = performance.now();

            const loop = (now) => {
                if (!this.running) return;
                const delta = now - this.lastFrameTime;
                this.lastFrameTime = now;
                this.update(delta);
                requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
        }

        stop() {
            this.running = false;
        }

        setSprites(sprites) {
            this.spriteImages = sprites;
            this.updateSprite();
        }

        updateSprite() {
            if (this.spriteImages.length === 0 || !this.imgElement) return;
            const frameIndex = this.state === NekoState.SLEEP
                ? this.animationTable[this.state][(this.tickCount >> 2) & 0x1]
                : this.animationTable[this.state][this.tickCount & 0x1];
            if (this.spriteImages[frameIndex]) {
                this.imgElement.src = this.spriteImages[frameIndex];
                this.imgElement.style.transform = mascotMode ? "scale(1.5)" : "scale(1)";
                this.imgElement.style.transformOrigin = "center center";
            }
        }

        updatePosition() {
            this.element.style.left = Math.round(this.x) + "px";
            this.element.style.top = Math.round(this.y) + "px";
        }

        update(deltaMs) {
            if (this.tickAccumulator === undefined) this.tickAccumulator = 0;
            const originalTickMs = 200; // 5 FPS = 200ms per tick
            this.tickAccumulator += (deltaMs || 16) / originalTickMs;

            // Process all accumulated ticks
            while (this.tickAccumulator >= 1) {
                this.tickAccumulator -= 1;
                this.prevLogicX = this.logicX;
                this.prevLogicY = this.logicY;
                this.processOriginalTick();
            }

            // Interpolate for smooth rendering
            const t = this.tickAccumulator;
            this.x = this.prevLogicX + (this.logicX - this.prevLogicX) * t;
            this.y = this.prevLogicY + (this.logicY - this.prevLogicY) * t;
            this.updatePosition();
        }

        processOriginalTick() {
            this.tickCount++;
            if (this.tickCount >= 9999) this.tickCount = 0;
            if (this.tickCount % 2 === 0) {
                this.stateCount++;
            }

            // When sleeping, stay frozen - don't run behavior
            if (this.state !== NekoState.SLEEP) {
                switch (this.behaviorMode) {
                    case BehaviorMode.CHASE_MOUSE:
                        this.chaseMouse();
                        break;
                    case BehaviorMode.RUN_AWAY_FROM_MOUSE:
                        this.runAwayFromMouse();
                        break;
                    case BehaviorMode.RUN_AROUND_RANDOMLY:
                        this.runRandomly();
                        break;
                    case BehaviorMode.PACE_AROUND_SCREEN:
                        this.paceAroundScreen();
                        break;
                    case BehaviorMode.RUN_AROUND:
                        this.runAround();
                        break;
                }
            }

            this.updateSprite();
        }

        chaseMouse() {
            if (!this.hasMouseMoved) {
                this.runTowards(this.logicX + currentSpriteSize / 2, this.logicY + currentSpriteSize - 1);
                return;
            }
            this.runTowards(this.mouseX, this.mouseY);
        }

        runAwayFromMouse() {
            if (!this.hasMouseMoved) {
                this.runTowards(this.logicX + currentSpriteSize / 2, this.logicY + currentSpriteSize - 1);
                return;
            }
            const dwLimit = this.idleThreshold * 16;
            const xdiff = this.logicX + currentSpriteSize / 2 - this.mouseX;
            const ydiff = this.logicY + currentSpriteSize / 2 - this.mouseY;

            if (Math.abs(xdiff) < dwLimit && Math.abs(ydiff) < dwLimit) {
                const dLength = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
                let targetX, targetY;
                if (dLength !== 0) {
                    targetX = this.logicX + (xdiff / dLength) * dwLimit;
                    targetY = this.logicY + (ydiff / dLength) * dwLimit;
                } else {
                    targetX = targetY = 32;
                }
                this.runTowards(targetX, targetY);
                if (this.state === NekoState.AWAKE) {
                    this.calcDirection(targetX - this.logicX, targetY - this.logicY);
                }
            } else {
                this.runTowards(this.targetX, this.targetY);
            }
        }

        runRandomly() {
            if (this.state === NekoState.SLEEP) {
                this.actionCount = (this.actionCount || 0) + 1;
            }
            if ((this.actionCount || 0) > this.idleThreshold * 10) {
                this.actionCount = 0;
                this.targetX = Math.random() * this.boundsWidth;
                this.targetY = Math.random() * this.boundsHeight;
                this.runTowards(this.targetX, this.targetY);
            } else {
                this.runTowards(this.targetX, this.targetY);
            }
        }

        paceAroundScreen() {
            if (this.lastMoveDX === 0 && this.lastMoveDY === 0) {
                this.cornerIndex = ((this.cornerIndex || 0) + 1) % 4;
            }
            const corners = [
                [currentSpriteSize + currentSpriteSize / 2, currentSpriteSize + currentSpriteSize - 1],
                [currentSpriteSize + currentSpriteSize / 2, this.boundsHeight - currentSpriteSize + currentSpriteSize - 1],
                [this.boundsWidth - currentSpriteSize + currentSpriteSize / 2, this.boundsHeight - currentSpriteSize + currentSpriteSize - 1],
                [this.boundsWidth - currentSpriteSize + currentSpriteSize / 2, currentSpriteSize + currentSpriteSize - 1],
            ];
            const target = corners[this.cornerIndex || 0];
            this.runTowards(target[0], target[1]);
        }

        runAround() {
            const dwBoundingBox = this.speed * 8;
            if (this.ballX === 0 && this.ballY === 0) {
                this.ballX = Math.random() * (this.boundsWidth - dwBoundingBox);
                this.ballY = Math.random() * (this.boundsHeight - dwBoundingBox);
                this.ballVX = (Math.random() < 0.5 ? 1 : -1) * (this.speed / 2) + 1;
                this.ballVY = (Math.random() < 0.5 ? 1 : -1) * (this.speed / 2) + 1;
            }
            this.ballX += this.ballVX;
            this.ballY += this.ballVY;

            if (this.ballX < dwBoundingBox) {
                if (this.ballX > 0) this.ballVX++;
                else this.ballVX = -this.ballVX;
            } else if (this.ballX > this.boundsWidth - dwBoundingBox) {
                if (this.ballX < this.boundsWidth) this.ballVX--;
                else this.ballVX = -this.ballVX;
            }

            if (this.ballY < dwBoundingBox) {
                if (this.ballY > 0) this.ballVY++;
                else this.ballVY = -this.ballVY;
            } else if (this.ballY > this.boundsHeight - dwBoundingBox) {
                if (this.ballY < this.boundsHeight) this.ballVY--;
                else this.ballVY = -this.ballVY;
            }

            this.runTowards(this.ballX, this.ballY);
        }

        setState(newState) {
            this.tickCount = 0;
            this.stateCount = 0;
            this.state = newState;
        }

        runTowards(targetX, targetY) {
            this.oldTargetX = this.targetX;
            this.oldTargetY = this.targetY;
            this.targetX = targetX;
            this.targetY = targetY;

            const dx = targetX - this.logicX - currentSpriteSize / 2;
            const dy = targetY - this.logicY - currentSpriteSize + 1;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance !== 0) {
                if (distance <= this.speed) {
                    this.moveDX = Math.trunc(dx);
                    this.moveDY = Math.trunc(dy);
                } else {
                    this.moveDX = Math.trunc((this.speed * dx) / distance);
                    this.moveDY = Math.trunc((this.speed * dy) / distance);
                }
            } else {
                this.moveDX = 0;
                this.moveDY = 0;
            }

            this.lastMoveDX = this.moveDX;
            this.lastMoveDY = this.moveDY;

            const moveStart = !(
                this.oldTargetX >= this.targetX - this.idleThreshold &&
                this.oldTargetX <= this.targetX + this.idleThreshold &&
                this.oldTargetY >= this.targetY - this.idleThreshold &&
                this.oldTargetY <= this.targetY + this.idleThreshold
            );

            switch (this.state) {
                case NekoState.STOP:
                    if (moveStart) {
                        this.setState(NekoState.AWAKE);
                    } else if (this.stateCount >= STOP_TIME) {
                        if (this.moveDX < 0 && this.logicX <= 0) {
                            this.setState(NekoState.L_CLAW);
                        } else if (this.moveDX > 0 && this.logicX >= this.boundsWidth) {
                            this.setState(NekoState.R_CLAW);
                        } else if (this.moveDY < 0 && this.logicY <= 0) {
                            this.setState(NekoState.U_CLAW);
                        } else if (this.moveDY > 0 && this.logicY >= this.boundsHeight) {
                            this.setState(NekoState.D_CLAW);
                        } else {
                            this.setState(NekoState.WASH);
                        }
                    }
                    break;

                case NekoState.WASH:
                    if (moveStart) {
                        this.setState(NekoState.AWAKE);
                    } else if (this.stateCount >= WASH_TIME) {
                        this.setState(NekoState.SCRATCH);
                    }
                    break;

                case NekoState.SCRATCH:
                    if (moveStart) {
                        this.setState(NekoState.AWAKE);
                    } else if (this.stateCount >= SCRATCH_TIME) {
                        this.setState(NekoState.YAWN);
                    }
                    break;

                case NekoState.YAWN:
                    if (moveStart) {
                        this.setState(NekoState.AWAKE);
                    } else if (this.stateCount >= YAWN_TIME) {
                        this.setState(NekoState.SLEEP);
                    }
                    break;

                case NekoState.SLEEP:
                    if (moveStart) {
                        this.setState(NekoState.AWAKE);
                    }
                    break;

                case NekoState.AWAKE:
                    if (this.stateCount >= AWAKE_TIME + Math.floor(Math.random() * 20)) {
                        this.calcDirection(this.moveDX, this.moveDY);
                    }
                    break;

                case NekoState.U_MOVE:
                case NekoState.D_MOVE:
                case NekoState.L_MOVE:
                case NekoState.R_MOVE:
                case NekoState.UL_MOVE:
                case NekoState.UR_MOVE:
                case NekoState.DL_MOVE:
                case NekoState.DR_MOVE:
                    let newX = this.logicX + this.moveDX;
                    let newY = this.logicY + this.moveDY;
                    const wasOutside = newX <= 0 || newX >= this.boundsWidth || newY <= 0 || newY >= this.boundsHeight;
                    this.calcDirection(this.moveDX, this.moveDY);
                    newX = Math.max(0, Math.min(this.boundsWidth, newX));
                    newY = Math.max(0, Math.min(this.boundsHeight, newY));
                    const notMoved = newX === this.logicX && newY === this.logicY;
                    if (wasOutside && notMoved) {
                        this.setState(NekoState.STOP);
                    } else {
                        this.logicX = newX;
                        this.logicY = newY;
                    }
                    break;

                case NekoState.U_CLAW:
                case NekoState.D_CLAW:
                case NekoState.L_CLAW:
                case NekoState.R_CLAW:
                    if (moveStart) {
                        this.setState(NekoState.AWAKE);
                    } else if (this.stateCount >= CLAW_TIME) {
                        this.setState(NekoState.SCRATCH);
                    }
                    break;

                default:
                    this.setState(NekoState.STOP);
                    break;
            }
        }

        calcDirection(dx, dy) {
            let newState;
            if (dx === 0 && dy === 0) {
                newState = NekoState.STOP;
            } else {
                const largeX = dx;
                const largeY = -dy;
                const length = Math.sqrt(largeX * largeX + largeY * largeY);
                const sinTheta = largeY / length;
                const sinPiPer8 = 0.3826834323651;
                const sinPiPer8Times3 = 0.9238795325113;

                if (dx > 0) {
                    if (sinTheta > sinPiPer8Times3) {
                        newState = NekoState.U_MOVE;
                    } else if (sinTheta > sinPiPer8) {
                        newState = NekoState.UR_MOVE;
                    } else if (sinTheta > -sinPiPer8) {
                        newState = NekoState.R_MOVE;
                    } else if (sinTheta > -sinPiPer8Times3) {
                        newState = NekoState.DR_MOVE;
                    } else {
                        newState = NekoState.D_MOVE;
                    }
                } else {
                    if (sinTheta > sinPiPer8Times3) {
                        newState = NekoState.U_MOVE;
                    } else if (sinTheta > sinPiPer8) {
                        newState = NekoState.UL_MOVE;
                    } else if (sinTheta > -sinPiPer8) {
                        newState = NekoState.L_MOVE;
                    } else if (sinTheta > -sinPiPer8Times3) {
                        newState = NekoState.DL_MOVE;
                    } else {
                        newState = NekoState.D_MOVE;
                    }
                }
            }

            if (this.state !== newState) {
                this.setState(newState);
            }
        }

        isIdle() {
            return (
                this.state === NekoState.STOP ||
                this.state === NekoState.WASH ||
                this.state === NekoState.SCRATCH ||
                this.state === NekoState.YAWN ||
                this.state === NekoState.SLEEP ||
                this.state === NekoState.AWAKE
            );
        }

        cycleBehavior() {
            const behaviors = [
                BehaviorMode.CHASE_MOUSE,
                BehaviorMode.RUN_AWAY_FROM_MOUSE,
                BehaviorMode.RUN_AROUND_RANDOMLY,
                BehaviorMode.PACE_AROUND_SCREEN,
                BehaviorMode.RUN_AROUND,
            ];
            const currentIndex = behaviors.indexOf(this.behaviorMode);
            const nextIndex = (currentIndex + 1) % behaviors.length;
            this.behaviorMode = behaviors[nextIndex];

            if (this.state === NekoState.SLEEP) {
                this.setState(NekoState.AWAKE);
            }

            const behaviorNames = [
                "Chase Mouse",
                "Run Away From Mouse",
                "Run Around Randomly",
                "Pace Around Screen",
                "Run Around",
            ];
            console.log(`Neko behavior: ${behaviorNames[nextIndex]}`);
        }

        destroy() {
            this.stop();
            if (this._onPointerMove) {
                document.removeEventListener("pointermove", this._onPointerMove);
            }
            if (this._onResize) {
                window.removeEventListener("resize", this._onResize);
            }
            if (this._resizeTimeout) {
                clearTimeout(this._resizeTimeout);
            }
            if (this._clickTimeout) {
                clearTimeout(this._clickTimeout);
            }
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
    }

    // Export to global scope
    window.Neko = Neko;
    window.NekoState = NekoState;
    window.BehaviorMode = BehaviorMode;

    // Helper: set mascot mode (true = custom sprites, false = default neko)
    window.nekoSetMascotMode = function(enabled) {
        mascotMode = !!enabled;
        updateSpriteSize();
        if (window.neko) {
            window.neko.setSprites(mascotMode ? MASCOT_SPRITES : NEKO_SPRITES);
            // Briefly enter sleep for a cute transition
            window.neko.setState(NekoState.SLEEP);
        }
        try { localStorage.setItem("neko-mascot", String(mascotMode)); } catch(e) {}
    };

    // Helper: check current mascot mode
    window.nekoIsMascotMode = function() {
        return mascotMode;
    };

    // Listen for sprite toggle events from React UI
    window.addEventListener("neko-sprite-toggle", function() {
        window.nekoSetMascotMode(!mascotMode);
    });

    // Auto-initialize function
    window.createNeko = function(options) {
        const neko = new Neko(options);
        // Check localStorage for mascot preference
        let useMascot = false;
        try {
            const stored = localStorage.getItem("neko-mascot");
            useMascot = stored === "true";
        } catch(e) {}
        mascotMode = useMascot;
        updateSpriteSize();
        neko.setSprites(useMascot ? MASCOT_SPRITES : NEKO_SPRITES);
        neko.start();
        return neko;
    };

    // Preload mascot images to prevent broken images
    function preloadMascotImages() {
        MASCOT_SPRITES.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }

    // Auto-start if script has data-autostart attribute
    if (document.currentScript && document.currentScript.hasAttribute("data-autostart")) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function() {
                preloadMascotImages();
                window.neko = createNeko();
            });
        } else {
            preloadMascotImages();
            window.neko = createNeko();
        }
    }
})();
