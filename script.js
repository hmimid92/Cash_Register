let price = 19.5;
let cid = [
	["PENNY", 1.01],
	["NICKEL", 2.05],
	["DIME", 3.1],
	["QUARTER", 4.25],
	["ONE", 90],
	["FIVE", 55],
	["TEN", 20],
	["TWENTY", 60],
	["ONE HUNDRED", 100],
];

let totalValue = 3.87;

const purchaseBtn = document.getElementById("purchase-btn");

const changeDue = document.getElementById("change-due");

const change = document.querySelector(".change");

const keybordPad = document.querySelector(".pad");

const bottomDrawer = document.querySelector(".bottom-drawer");

const totalTag = document.querySelector(".total");

const cash = document.getElementById("cash");

window.onload = () => {
	const createDiv = () => {
		const divTag = document.createElement("div");
		divTag.className = "key";
		keybordPad.appendChild(divTag);
	};
	for (let i = 0; i <= 8; i++) {
		createDiv();
	}

	const divTag = document.createElement("div");
	divTag.className = "circle";
	bottomDrawer.appendChild(divTag);

	const divTag2 = document.createElement("div");
	divTag2.className = "rectangle";
	totalTag.appendChild(divTag2);

	updateChangeInDrawer(0);

	document.querySelector(".rectangle").innerHTML = `Total: $${totalValue}`;
};

const calculTotalChange = (cashDrawer) =>
	cashDrawer.reduce((acc, el) => el[1] + acc, 0);

// console.log(calculTotalChange(cid).toFixed(2));

const calculExactChange = (price, cash, cashDrawer) => {
	const difference = Number((cash - price).toFixed(2));

	if (cash < price) {
		alert("Customer does not have enough money to purchase the item");
	} else if (cash === price) {
		changeDue.innerHTML = "No change due - customer paid with exact cash";
	} else {
		if (Number(calculTotalChange(cashDrawer).toFixed(2)) < difference) {
			changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
		} else if (
			Number(calculTotalChange(cashDrawer).toFixed(2)) === difference
		) {
			updateChangeInDrawer(difference);
			changeDue.innerHTML = `
			<p>Status: CLOSED</p>
			<p class="dispP">PENNY: $${findPenny(difference)[0][1]}</p>
			<p class="dispN">NICKEL: $${findNickel(difference)[0][1]}</p>
			<p class="dispD">DIME: $${findDime(difference)[0][1]}</p>
			<p class="dispQ">QUARTER: $${findQuarter(difference)[0][1]}</p>
			<p class="dispO">ONE: $${findOne(difference)[0][1]}</p>
			<p class="dispF">FIVE: $${findFive(difference)[0][1]}</p>
			<p class="dispT">TEN: $${findTen(difference)[0][1]}</p>
			<p class="dispTw">TWENTY: $${findTwenty(difference)[0][1]}</p>
			<p class="dispHu">ONE HUNDRED: $${findHundred(difference)[0][1]}</p>
			`;
		} else {
			const drawer =
				Number(findPenny(difference)[0][1]) +
				Number(findNickel(difference)[0][1]) +
				Number(findDime(difference)[0][1]) +
				Number(findQuarter(difference)[0][1]) +
				Number(findOne(difference)[0][1]) +
				Number(findFive(difference)[0][1]) +
				Number(findTen(difference)[0][1]) +
				Number(findTwenty(difference)[0][1]) +
				Number(findHundred(difference)[0][1]);
			console.log("drw", drawer);
			console.log("dff", difference);
			if (drawer === difference) {
				updateChangeInDrawer(difference);
				changeDue.innerHTML = `
			<p>Status: OPEN</p>
			<p class="dispP">PENNY: $${findPenny(difference)[0][1]}</p>
			<p class="dispN">NICKEL: $${findNickel(difference)[0][1]}</p>
			<p class="dispD">DIME: $${findDime(difference)[0][1]}</p>
			<p class="dispQ">QUARTER: $${findQuarter(difference)[0][1]}</p>
			<p class="dispO">ONE: $${findOne(difference)[0][1]}</p>
			<p class="dispF">FIVE: $${findFive(difference)[0][1]}</p>
			<p class="dispT">TEN: $${findTen(difference)[0][1]}</p>
			<p class="dispTw">TWENTY: $${findTwenty(difference)[0][1]}</p>
			<p class="dispHu">ONE HUNDRED: $${findHundred(difference)[0][1]}</p>
			`;
			} else {
				changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
			}
		}
	}
	return {
		Hn: findHundred(difference)[0][1],
		Tw: findTwenty(difference)[0][1],
		Tn: findTen(difference)[0][1],
		Fv: findFive(difference)[0][1],
		On: findOne(difference)[0][1],
		Qu: findQuarter(difference)[0][1],
		Dm: findDime(difference)[0][1],
		Nc: findNickel(difference)[0][1],
		Pn: findPenny(difference)[0][1],
	};
};

const findHundred = (integer) => {
	let hundredRemain = 0;
	let changeDue = 0;
	if (integer >= 100) {
		hundredRemain = cid[8][1];
		while (integer >= 100) {
			hundredRemain -= 100;
			integer -= 100;
			if (hundredRemain >= 0) {
				changeDue += 100;
			} else {
				changeDue = cid[8][1];
				hundredRemain = 0;
				break;
			}
		}
	} else {
		hundredRemain = cid[8][1];
	}
	return [
		["ONE HUNDRED", changeDue],
		["One hundreds", hundredRemain],
	];
};

const findTwenty = (integer) => {
	let newInt = integer - findHundred(integer)[0][1];
	let twentyRemain = 0;
	let changeDue = 0;
	if (newInt >= 20) {
		twentyRemain = cid[7][1];
		while (newInt >= 20) {
			twentyRemain -= 20;
			newInt -= 20;
			if (twentyRemain >= 0) {
				changeDue += 20;
			} else {
				changeDue = cid[7][1];
				twentyRemain = 0;
				break;
			}
		}
	} else {
		twentyRemain = cid[7][1];
	}
	return [
		["TWENTY", changeDue],
		["Twenties", twentyRemain],
	];
};

const findTen = (integer) => {
	let newInt = integer - findTwenty(integer)[0][1] - findHundred(integer)[0][1];
	let tenRemain = 0;
	let changeDue = 0;
	if (newInt >= 10) {
		tenRemain = cid[6][1];
		while (newInt >= 10) {
			tenRemain -= 10;
			newInt -= 10;
			if (tenRemain >= 0) {
				changeDue += 10;
			} else {
				changeDue = cid[6][1];
				tenRemain = 0;
				break;
			}
		}
	} else {
		tenRemain = cid[6][1];
	}

	return [
		["TEN", changeDue],
		["Tens", tenRemain],
	];
};

const findFive = (integer) => {
	let newInt =
		integer -
		findTen(integer)[0][1] -
		findTwenty(integer)[0][1] -
		findHundred(integer)[0][1];

	let fiveRemain = 0;
	let changeDue = 0;
	if (newInt >= 5) {
		fiveRemain = cid[5][1];
		while (newInt >= 5) {
			fiveRemain -= 5;
			newInt -= 5;
			if (fiveRemain >= 0) {
				changeDue += 5;
			} else {
				changeDue = cid[5][1];
				fiveRemain = 0;
				break;
			}
		}
	} else {
		fiveRemain = cid[5][1];
	}
	return [
		["FIVE", changeDue],
		["Fives", fiveRemain],
	];
};

const findOne = (integer) => {
	let newInt =
		integer -
		findFive(integer)[0][1] -
		findTen(integer)[0][1] -
		findTwenty(integer)[0][1] -
		findHundred(integer)[0][1];

	let oneRemain = 0;
	let changeDue = 0;
	if (newInt >= 1) {
		oneRemain = cid[4][1];
		while (newInt >= 1) {
			oneRemain -= 1;
			newInt -= 1;
			if (oneRemain >= 0) {
				changeDue += 1;
			} else {
				changeDue = cid[4][1];
				oneRemain = 0;
				break;
			}
		}
	} else {
		oneRemain = cid[4][1];
	}
	return [
		["ONE", changeDue],
		["Ones", oneRemain],
	];
};

const findQuarter = (integer) => {
	let decimal =
		integer -
		findOne(integer)[0][1] -
		findFive(integer)[0][1] -
		findTen(integer)[0][1] -
		findTwenty(integer)[0][1] -
		findHundred(integer)[0][1];
	let quarterRemain = 0;
	let changeDue = 0;
	if (decimal >= 0.25) {
		quarterRemain = cid[3][1];
		while (decimal >= 0.25) {
			quarterRemain -= 0.25;
			decimal -= 0.25;
			if (quarterRemain >= 0) {
				changeDue += 0.25;
			} else {
				changeDue = cid[3][1];
				quarterRemain = 0;
				break;
			}
		}
	} else {
		quarterRemain = cid[3][1];
	}
	return [
		["QUARTER", changeDue],
		["Quarters", quarterRemain],
	];
};

const findDime = (integer) => {
	let newDecimal =
		integer -
		findQuarter(integer)[0][1] -
		findOne(integer)[0][1] -
		findFive(integer)[0][1] -
		findTen(integer)[0][1] -
		findTwenty(integer)[0][1] -
		findHundred(integer)[0][1];
	let dimeRemain = 0;
	let changeDue = 0;
	if (newDecimal >= 0.1) {
		dimeRemain = cid[2][1];
		while (newDecimal >= 0.1) {
			dimeRemain -= 0.1;
			newDecimal -= 0.1;
			if (dimeRemain >= 0) {
				changeDue += 0.1;
			} else {
				changeDue = cid[2][1];
				dimeRemain = 0;
				break;
			}
		}
	} else {
		dimeRemain = cid[2][1];
	}
	return [
		["DIME", changeDue],
		["DIMES", dimeRemain],
	];
};

const findNickel = (integer) => {
	let newDecimal =
		integer -
		findDime(integer)[0][1] -
		findQuarter(integer)[0][1] -
		findOne(integer)[0][1] -
		findFive(integer)[0][1] -
		findTen(integer)[0][1] -
		findTwenty(integer)[0][1] -
		findHundred(integer)[0][1];
	let nickelRemain = 0;
	let changeDue = 0;
	if (newDecimal >= 0.05) {
		nickelRemain = cid[1][1];
		while (newDecimal >= 0.05) {
			nickelRemain -= 0.05;
			newDecimal -= 0.05;
			if (nickelRemain >= 0) {
				changeDue += 0.05;
			} else {
				changeDue = cid[1][1];
				nickelRemain = 0;
				break;
			}
		}
	} else {
		nickelRemain = cid[1][1];
	}
	return [
		["NICKEL", changeDue],
		["Nickels", nickelRemain],
	];
};

const findPenny = (integer) => {
	let newDecimal = Number(
		(
			integer -
			findNickel(integer)[0][1] -
			findDime(integer)[0][1] -
			findQuarter(integer)[0][1] -
			findOne(integer)[0][1] -
			findFive(integer)[0][1] -
			findTen(integer)[0][1] -
			findTwenty(integer)[0][1] -
			findHundred(integer)[0][1]
		).toFixed(2)
	);
	let pennyRemain = 0;
	let changeDue = 0;

	pennyRemain = cid[0][1];
	while (newDecimal > 0) {
		pennyRemain -= 0.01;
		newDecimal -= 0.01;
		if (pennyRemain >= 0) {
			changeDue += 0.01;
		} else {
			changeDue = cid[0][1];
			pennyRemain = 0;
			break;
		}
	}

	return [
		["PENNY", changeDue.toFixed(2)],
		["Pennies", pennyRemain.toFixed(2)],
	];
};

const updateChangeInDrawer = (difference) => {
	change.innerHTML = `
	<h3>Change in drawer: </h3>
	 <p>Pennies: $${difference === 0 ? cid[0][1] : findPenny(difference)[1][1]}</p>
     <p>Nickels: $${
				difference === 0 ? cid[1][1] : findNickel(difference)[1][1]
			}</p>
     <p>Dimes: $${difference === 0 ? cid[2][1] : findDime(difference)[1][1]}</p>
     <p>Quarters: $${
				difference === 0 ? cid[3][1] : findQuarter(difference)[1][1]
			}</p>
     <p>Ones: $${difference === 0 ? cid[4][1] : findOne(difference)[1][1]}</p>
     <p>Fives: $${difference === 0 ? cid[5][1] : findFive(difference)[1][1]}</p>
     <p>Tens: $${difference === 0 ? cid[6][1] : findTen(difference)[1][1]}</p>
     <p>Twenties: $${
				difference === 0 ? cid[7][1] : findTwenty(difference)[1][1]
			}</p>
     <p>One hundreds: $${
				difference === 0 ? cid[8][1] : findHundred(difference)[1][1]
			}</p>`;
};

purchaseBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const obj = calculExactChange(price, Number(cash.value), cid);

	if (Number(obj.Pn) === 0 && document.querySelector(".dispP") !== null) {
		document.querySelector(".dispP").style.display = "none";
	}

	if (Number(obj.Dm) === 0 && document.querySelector(".dispD") !== null) {
		document.querySelector(".dispD").style.display = "none";
	}

	if (Number(obj.Fv) === 0 && document.querySelector(".dispF") !== null) {
		document.querySelector(".dispF").style.display = "none";
	}

	if (Number(obj.Hn) === 0 && document.querySelector(".dispHu") !== null) {
		document.querySelector(".dispHu").style.display = "none";
	}

	if (Number(obj.Nc) === 0 && document.querySelector(".dispN") !== null) {
		document.querySelector(".dispN").style.display = "none";
	}

	if (Number(obj.Qu) === 0 && document.querySelector(".dispQ") !== null) {
		document.querySelector(".dispQ").style.display = "none";
	}

	if (Number(obj.Tw) === 0 && document.querySelector(".dispTw") !== null) {
		document.querySelector(".dispTw").style.display = "none";
	}

	if (Number(obj.Tn) === 0 && document.querySelector(".dispT") !== null) {
		document.querySelector(".dispT").style.display = "none";
	}

	if (Number(obj.On) === 0 && document.querySelector(".dispO") !== null) {
		document.querySelector(".dispO").style.display = "none";
	}
});
