import { Injectable } from '@nestjs/common';
import Web3, { Contract } from 'web3';
import { CausaBeneficaDto } from './dto';
import { abi } from './contracts/causa_benefica.json';
import { address } from './contracts/causa_benefica_address.json';
import { sender } from './contracts/causa_benefica_sender.json';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async crearCausaBenefica(createCBDto: CausaBeneficaDto) {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:7545')
      );
      const contract = new web3.eth.Contract(abi, address);
      await contract.methods.anadirCausaBenefica(createCBDto.nombre, createCBDto.wallet).send({ from: sender, gas: '500000' });  
    } catch (error) {
      console.error('Error al interactuar con el contrato:', error);
      throw error;
    }

  }

  async obtenerCausasBeneficas() {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:7545')
      );
      const contract = new web3.eth.Contract(abi, address);
      // Llama a un método del contrato
      const result = await contract.methods.obtenerCausasBeneficas().call();
      let causasBeneficas = new Array<CausaBeneficaDto>();
      let resultArray = result as Array<CausaBeneficaDto>;
      resultArray.forEach(function (value) {
        causasBeneficas.push(new CausaBeneficaDto(value.nombre, value.wallet, value.fondosRecibidos.toString()));
      });   
      return causasBeneficas;
    } catch (error) {
      console.error('Error al interactuar con el contrato:', error);
      throw error;
    }
  }

  async donar(causaBeneficaDto: CausaBeneficaDto) {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:7545')
      );
      const contract = new web3.eth.Contract(abi, address);
      // Llama a un método del contrato    
      await contract.methods.donar(causaBeneficaDto.id).send({ from: causaBeneficaDto.wallet, value: causaBeneficaDto.cantidad.toString(), gas: '500000' });
    } catch (error) {
      console.error('Error al interactuar con el contrato:', error);
      throw error;
    }
  }

  async distribuirFondos() {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:7545')
      );
      const contract = new web3.eth.Contract(abi, address);
      // Llama a un método del contrato    
      await contract.methods.distribuirFondos().send({ from: sender, gas: '500000' });
    } catch (error) {
      console.error('Error al interactuar con el contrato:', error);
      throw error;
    }
  }

  async obtenerBalance() {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:7545')
      );
      const contract = new web3.eth.Contract(abi, address);
      // Llama a un método del contrato
      const result = await contract.methods.obtenerBalance().call();
      return result;
    } catch (error) {
      console.error('Error al interactuar con el contrato:', error);
      throw error;
    }
  }

  async obtenerCausasDonadas(wallet: string) {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:7545')
      );
      const contract = new web3.eth.Contract(abi, address);
      // Llama a un método del contrato
      const result = await contract.methods.obtenerCausasDonadas(wallet).call();    
      let causasDonadas = new Array<string>();
      let resultArray = result as Array<number>;
      let causasBeneficas = await this.obtenerCausasBeneficas();
      resultArray.forEach(function (value) {       
        causasDonadas.push(causasBeneficas[value].nombre);
      });      
      return causasDonadas;
    } catch (error) {
      console.error('Error al interactuar con el contrato:', error);
      throw error;
    }
  }

}
