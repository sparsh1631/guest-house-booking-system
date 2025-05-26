package com.guesthouse.config;

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

        return modelMapper;
    }
}