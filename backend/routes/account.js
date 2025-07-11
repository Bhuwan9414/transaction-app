const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const { Account } = require("../db")
const { authMiddleware } = require("../middleware")

// for getting the users account balance
router.get("/balance", authMiddleware, async function (req, res) {

    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })

})

// for transfering the amount from one users account to another user account :

router.post("/transaction", authMiddleware, async function (req, res) {

    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    // if there are not sufficient funds in the senders account:
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "insufficient balance"
        })
    }

    const toaccount = await Account.findOne({
        userId: to
    }).session(session)

    if (!toaccount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "invalid account"
        })
    }

    
    // perform the transfer :
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        msg : "transaction successfull"
    });
});

// without using transactions

router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    });

    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    });

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })

    res.json({
        message: "Transfer successful"
    })
});

// router.post("/transfer", authMiddleware, async function(req, res){

//     const {amount, to} = req.body;

//     const account = await Account.findOne({
//         userId : req.userId
//     })

//     if(account.balance < amount){
//         res.status(400).json({
//             msg : "not enough funds"
//         })
//     }

//     const toaccount = await Account.findOne({
//         userId : to
//     })

//     if(!toaccount){
//         res.status(400).json({
//             msg : "invalid account"
//         })
//     }



   
// })


module.exports = router