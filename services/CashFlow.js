const cashFlowModel = require('./../models/CashFlow');
const { verifyId } = require('./../utils/MongoUtils');

const CashFlowService = {};

CashFlowService.verifyCalculateCashFlowFields = ({ business, year0, year1, year2, year3, year4, year5, rateOfReturn }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: 'Flujo de caja calculado exitosamente.'
        }
    }

    if (!business || !verifyId(business)) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Id de empresa no válido.'
            }
        }

        return serviceResponse;
    }

    if (!year0 || !year1 || !year2 || !year3 || !year4 || !year5) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Uno o varios años no tienen contenido.'
            }
        }

        return serviceResponse;
    }

    if (!rateOfReturn) {
        serviceResponse = {
            success: false,
            content: {
                error: 'No se ingresó tasa de retorno.'
            }
        }

        return serviceResponse;
    }

    return serviceResponse;
}

CashFlowService.calculateCashFlow = ({ business, year0, year1, year2, year3, year4, year5, rateOfReturn }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    const rateOfReturnPorcentage = rateOfReturn / 100;

    const year_0 = year0.replace('[', '').replace(']', '').split(', ');
    const year_1 = year1.replace('[', '').replace(']', '').split(', ');
    const year_2 = year2.replace('[', '').replace(']', '').split(', ');
    const year_3 = year3.replace('[', '').replace(']', '').split(', ');
    const year_4 = year4.replace('[', '').replace(']', '').split(', ');
    const year_5 = year5.replace('[', '').replace(']', '').split(', ');

    console.info(year_0);
    console.info(year_1);
    console.info(year_2);
    console.info(year_3);
    console.info(year_4);
    console.info(year_5);

    const cashFlowYear0 = year_0.reduce((acummulator, item) => parseFloat(acummulator) + parseFloat(item));
    const cashFlowYear1 = year_1.reduce((acummulator, item) => parseFloat(acummulator) + parseFloat(item));
    const cashFlowYear2 = year_2.reduce((acummulator, item) => parseFloat(acummulator) + parseFloat(item));
    const cashFlowYear3 = year_3.reduce((acummulator, item) => parseFloat(acummulator) + parseFloat(item));
    const cashFlowYear4 = year_4.reduce((acummulator, item) => parseFloat(acummulator) + parseFloat(item));
    const cashFlowYear5 = year_5.reduce((acummulator, item) => parseFloat(acummulator) + parseFloat(item));

    console.info(cashFlowYear0);
    console.info(cashFlowYear1);
    console.info(cashFlowYear2);
    console.info(cashFlowYear3);
    console.info(cashFlowYear4);
    console.info(cashFlowYear5);
    
    const totalCurrentValue = cashFlowYear0 
                            + (cashFlowYear1 / (1 + rateOfReturnPorcentage)) 
                            + (cashFlowYear2 / Math.pow((1 + rateOfReturnPorcentage), 2)) 
                            + (cashFlowYear3 / Math.pow((1 + rateOfReturnPorcentage), 3))
                            + (cashFlowYear4 / Math.pow((1 + rateOfReturnPorcentage), 4))
                            + (cashFlowYear5 / Math.pow((1 + rateOfReturnPorcentage), 5));
    
    const newCashFlow = new cashFlowModel({
        business,
        year0: year_0,
        year1: year_1,
        year2: year_2,
        year3: year_3,
        year4: year_4,
        year5: year_5,
        cashFlowYear0,
        cashFlowYear1,
        cashFlowYear2,
        cashFlowYear3,
        cashFlowYear4,
        cashFlowYear5,
        rateOfReturn,
        totalCurrentValue
    });

    if (!newCashFlow) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Algo salió mal con el nuevo flujo de caja.'
            }
        }
    } else {
        serviceResponse.content = newCashFlow;
    }

    return serviceResponse;
    
}

CashFlowService.verifySaveCashFlowFields = ({ business, year0, year1, year2, year3, year4, year5, cashFlowYear0, cashFlowYear1, cashFlowYear2, cashFlowYear3, cashFlowYear4, cashFlowYear5, rateOfReturn, totalCurrentValue }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    if (!business || !verifyId(business)) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Id de empresa no válido.'
            }
        }

        return serviceResponse;
    }

    if (!year0 || !year1 || !year2 || !year3 || !year4 || !year5 || !cashFlowYear0 || !cashFlowYear1 || !cashFlowYear2 || !cashFlowYear3 || !cashFlowYear4 || !cashFlowYear5 || !rateOfReturn || !totalCurrentValue) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Uno o varios campos no tienen contenido.'
            }
        }

        return serviceResponse;
    }

    return serviceResponse;
}

CashFlowService.saveCashFlow = async ({ business, year0, year1, year2, year3, year4, year5, cashFlowYear0, cashFlowYear1, cashFlowYear2, cashFlowYear3, cashFlowYear4, cashFlowYear5, rateOfReturn, totalCurrentValue }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: {}
        }
    }

    const year_0 = year0.replace('[', '').replace(']', '').split(', ');
    const year_1 = year1.replace('[', '').replace(']', '').split(', ');
    const year_2 = year2.replace('[', '').replace(']', '').split(', ');
    const year_3 = year3.replace('[', '').replace(']', '').split(', ');
    const year_4 = year4.replace('[', '').replace(']', '').split(', ');
    const year_5 = year5.replace('[', '').replace(']', '').split(', ');

    const newCashFlow = new cashFlowModel({
        business,
        year0: year_0,
        year1: year_1,
        year2: year_2,
        year3: year_3,
        year4: year_4,
        year5: year_5,
        cashFlowYear0,
        cashFlowYear1,
        cashFlowYear2,
        cashFlowYear3,
        cashFlowYear4,
        cashFlowYear5,
        rateOfReturn,
        totalCurrentValue
    });

    if (!newCashFlow) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Algo salió mal con el nuevo flujo de caja.'
            }
        }

        return serviceResponse
    }

    const savedCashFlow = await newCashFlow.save();

    if (!savedCashFlow) {
        serviceResponse = {
            success: false,
            content: {
                error: 'No se pudo guardar el flujo de caja.'
            }
        }
    } else {
        serviceResponse.content = savedCashFlow;
    }

    return serviceResponse;
}

module.exports = CashFlowService;