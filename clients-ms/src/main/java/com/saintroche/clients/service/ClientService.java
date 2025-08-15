package com.saintroche.clients.service;

import java.util.List;
import java.util.Optional;

import com.saintroche.clients.models.entities.Client;
import com.saintroche.clients.repositories.ClientRepository;

public interface ClientService {

    List<Client> getAllClients();

    Optional<Client> getClientById(Long id);

    Client createClient(Client client);

    Client updateClient(Long id, Client client);

    Optional<Client> getClientByEmail(String email);

    Optional<ClientRepository.ClientWithoutPassword> getCurrentClientFromToken(String token);

    Optional<ClientRepository.ClientWithoutPassword> getClientByEmailWithoutPw(String email);

    void deleteClient(Long id);

    // List<Client> searchBy(String texto);
    // List<Product> getOrderedProducts();
    // List<Object[]> countByCategory();
    // List<Product> getActiveProductsWithLowStock(int threshold);
    // List<Object[]> getAveragePriceByCategory();
}
