// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC1155LazyMint.sol";

contract PokemonEvolveContract is ERC1155LazyMint {
    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint16 _royaltyBps
    ) ERC1155LazyMint(_defaultAdmin, _name, _symbol, msg.sender, 0) {}

     function verifyClaim(address _claimer, uint256 _tokenId, uint256 _quantity) public view override {
        
         if(_tokenId ==0)
         {
         require(_tokenId ==0 , "Only squirtle are claimable");
         require(_quantity ==1 , "Only 1 squirtle are claimable");
         }
         else if(_tokenId ==3)
         {
         require(_tokenId ==3 , "Only charmander are claimable");
         require(_quantity ==1 , "Only 1 charmender are claimable");

         }
         else if(_tokenId ==6)
         {
         require(_tokenId ==6 , "Only Pichu are claimable");
         require(_quantity ==1 , "Only 1 pichu are claimable");
            
         }
         else if(_tokenId ==9)
         {
         require(_tokenId ==9 , "Only Vulpix are claimable");
         require(_quantity ==1 , "Only 1 Vulpix are claimable");
            
         }
     }

    function claim(address _receiver, uint256 _tokenId, uint256 _quantity) public payable override nonReentrant {
        require(_tokenId < nextTokenIdToMint(), "invalid id");
        verifyClaim(msg.sender, _tokenId, _quantity); // Add your claim verification logic by overriding this function.

        _transferTokensOnClaim(_receiver, _tokenId, _quantity); // Mints tokens. Apply any state updates by overriding this function.
        emit TokensClaimed(msg.sender, _receiver, _tokenId, _quantity);
    }

    function evolve(uint _tokenId) public {

         if(_tokenId ==0) //squritle
         {
            _burn(msg.sender, 0, 2);  //burn squrile
            _mint(msg.sender, 1, 1, ""); //mint wortotle
            
         }
         else if(_tokenId ==1) //wartotle
         {
            _burn(msg.sender, 1, 2); //burn wartotle
            _mint(msg.sender, 2, 1, ""); //mint Baltoise
         

         }
         else if(_tokenId ==3) //charmander
         {
            _burn(msg.sender, 3, 2); //burn charmneder
            _mint(msg.sender, 4, 1, ""); //mint charmelion
         

         }
         else if(_tokenId ==4) //charmelion
         {
            _burn(msg.sender, 4, 2); //burn charmelion
            _mint(msg.sender, 5, 1, ""); //mint chalichard
         

         }
         else if(_tokenId ==6) //pichu
         {
            _burn(msg.sender, 6, 2); // burn pichu
            _mint(msg.sender, 7, 1, ""); // mint pickchu
        
            
         }
         else if(_tokenId ==7) //pichahu
         {
            _burn(msg.sender, 7, 2); // burn pichau
            _mint(msg.sender, 8, 1, ""); // mint raichu
        
            
         }
         
         else if(_tokenId ==9) // vulpix
         {
             _burn(msg.sender, 9, 2); // burn vulpix
            _mint(msg.sender, 10, 1, ""); // mint ninetale
        
            
         }
       
       
    }
}