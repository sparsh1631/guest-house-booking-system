package com.guesthouse.config;

import com.guesthouse.model.enums1.RoomStatus;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration for ModelMapper bean
 */
@Configuration
public class ModelMapperConfig {

    /**
     * Creates and configures ModelMapper instance
     * @return Configured ModelMapper bean
     */
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Configure for strict mapping (field names must match exactly)
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setSkipNullEnabled(true); // Skip null values during mapping

        // Add converter for String to RoomStatus enum
        modelMapper.createTypeMap(String.class, RoomStatus.class)
                .setConverter(context -> RoomStatus.valueOf(context.getSource()));

        return modelMapper;
    }
}