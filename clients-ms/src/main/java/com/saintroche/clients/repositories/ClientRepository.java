package com.saintroche.clients.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.saintroche.clients.models.entities.Client;

import feign.Param;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    public interface ClientWithoutPassword {

        Long getId();

        String getFirstName();

        String getLastName();

        String getEmail();

        Boolean getActive();

        String getRole();
    }

    @Query("SELECT c FROM Client c WHERE c.email = :email")
    Optional<ClientWithoutPassword> findClientByEmailWithoutPassword(@Param("email") String email);

    @Query("SELECT c FROM Client c WHERE c.email = :email")
    Optional<Client> findByEmail(String email);

    @Query("update Client c set c.active = false where c.id = :userId")
    @Modifying
    void deactivateUser(@Param("userId") Long userId);
    // @Query("select p from Product p order by p.precio desc")
    // List<Client> findAllOrderByPriceDesc();
    // @Query("select p.categoria, count(p) from Product p group by p.categoria")
    // List<Object[]> countByCategory();
    // @Query("select p from Product p where p.stock < :threshold")
    // List<Client> findByStockLessThan(int threshold);
    // @Query("select p from Product p where p.stock < :threshold and p.estado = true")
    // List<Client> findActiveByStockLessThan(int threshold);
    // @Query("select p.categoria, round(avg(p.precio), 2) from Product p group by p.categoria")
    // List<Object[]> findAveragePriceByCategory();
    // // @Query("select p from Product p where lower(p.nombre) like lower(concat('%', :texto, '%')) or lower(p.descripcion) like lower(concat('%', :texto, '%'))")
    // @Query("select p from Product p where lower(p.nombre) like lower(:texto) or lower(p.descripcion) like lower(:texto)")
    // List<Client> searchBy(String texto);
}
